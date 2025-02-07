import { eq } from "drizzle-orm";
import DriveContent from "~/components/drive-content";
import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";

export default async function FolderPage(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);

  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  console.log(params.folderId, "folderId");
  const files = await db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, parsedFolderId));
  const folders = await db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, parsedFolderId));
  return (
    <div className="min-h-screen p-8">
      <DriveContent files={files} folders={folders} />
    </div>
  );
}
