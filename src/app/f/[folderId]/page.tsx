import DriveContent from "~/components/drive-content";
import {
  getAllParentsForFolder,
  getFiles,
  getFolders,
} from "~/server/db/queries";

export default async function FolderPage(props: {
  params: Promise<{ folderId: string }>;
}) {
  const folderId = (await props.params).folderId;

  const parsedFolderId = parseInt(folderId);

  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const [files, folders, parents] = await Promise.all([
    getFiles(parsedFolderId),
    getFolders(parsedFolderId),
    getAllParentsForFolder(parsedFolderId),
  ]);

  return (
    <div className="min-h-screen p-8">
      <DriveContent
        files={files}
        folders={folders}
        parents={parents}
        currentFolderId={parsedFolderId}
      />
    </div>
  );
}
