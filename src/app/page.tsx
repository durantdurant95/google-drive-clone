import DriveContent from "~/components/drive-content";
import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";

export default async function HomePage() {
  const files = await db.select().from(filesSchema);
  const folders = await db.select().from(foldersSchema);
  return (
    <div className="min-h-screen p-8">
      <DriveContent files={files} folders={folders} />
    </div>
  );
}
