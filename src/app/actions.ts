"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createFolder } from "~/server/db/mutations";

export async function createFolderAction(formData: FormData) {
  try {
    const session = await auth();
    if (!session.userId) throw new Error("Unauthorized");

    const name = formData.get("name") as string;
    const folderId = Number(formData.get("folderId"));

    const result = await createFolder({
      folder: {
        name: name.trim(),
        parent: folderId,
      },
      userId: session.userId,
    });

    revalidatePath(`/f/${folderId}`);
    return { success: true, id: result[0].insertId };
  } catch (error) {
    return { success: false, error: "Failed to create folder" };
  }
}
