import { and, eq, isNull } from "drizzle-orm";
import "server-only";
import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "~/server/db/schema";

export async function getAllParentsForFolder(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;
  while (currentId !== null) {
    const folder = await db
      .selectDistinct()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, currentId));

    if (!folder[0]) {
      throw new Error("Parent folder not found");
    }

    parents.unshift(folder[0]);
    currentId = folder[0]?.parent;
  }
  return parents;
}

export function getFiles(folderId: number) {
  return db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, folderId))
    .orderBy(filesSchema.name);
}

export function getFolders(parsedFolderId: number) {
  return db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, parsedFolderId))
    .orderBy(foldersSchema.name);
}

export async function getFolderById(folderId: number) {
  const folder = await db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.id, folderId));
  return folder[0];
}

export async function getRootFolderForUser(userId: string) {
  const rootFolder = await db
    .select()
    .from(foldersSchema)
    .where(
      and(eq(foldersSchema.ownerId, userId), isNull(foldersSchema.parent)),
    );
  return rootFolder[0];
}
