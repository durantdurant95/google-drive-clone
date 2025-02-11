"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";
import { db } from ".";
import { files_table } from "./schema";

const utApi = new UTApi();

export async function deleteFile(fileId: number) {
  const session = await auth();
  if (!session.userId) {
    throw new Error("User not authenticated");
  }

  // Delete the file from the database
  const [file] = await db
    .select()
    .from(files_table)
    .where(
      and(eq(files_table.id, fileId), eq(files_table.ownerId, session.userId)),
    );

  if (!file) {
    throw new Error(
      "File not found or you do not have permission to delete it",
    );
  }
  await utApi.deleteFiles([file.url.replace("https://utfs.io/f/", "")]);

  await db.delete(files_table).where(eq(files_table.id, fileId));
  revalidatePath("");
}
