import "server-only";
import { db } from ".";
import { files_table } from "./schema";

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
