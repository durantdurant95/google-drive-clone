import "server-only";
import { db } from ".";
import { files_table } from "./schema";

export const createFile = async (input: {
  file: {
    name: string;
    size: number;
    url: string;
  };
  userId: string;
}) => {
  return db.insert(files_table).values({ ...input.file, parent: 1 });
};
