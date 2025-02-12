import "server-only";
import { db } from ".";
import { files_table, folders_table } from "./schema";

export const createFile = async (input: {
  file: {
    name: string;
    size: number;
    url: string;
    parent: number;
  };
  userId: string;
}) => {
  return db
    .insert(files_table)
    .values({ ...input.file, ownerId: input.userId });
};

export const createRootFolder = async (input: { userId: string }) => {
  return db.insert(folders_table).values({
    name: "root",
    ownerId: input.userId,
    parent: null,
  });
};

export const createFolder = async (input: {
  folder: {
    name: string;
    parent: number;
  };
  userId: string;
}) => {
  return db.insert(folders_table).values({
    name: input.folder.name,
    parent: input.folder.parent,
    ownerId: input.userId,
  });
};
