import { FileIcon, FolderIcon } from "lucide-react";
import Link from "next/link";
import type { File, Folder } from "~/lib/mock-data";
import { TableCell, TableRow } from "./ui/table";

export function FileRow(props: { file: File }) {
  const { file } = props;
  return (
    <TableRow key={file.id}>
      <TableCell>
        <Link href={file.url} target="_blank" className="flex gap-1">
          <FileIcon size={20} />
          {file.name}
        </Link>
      </TableCell>
      <TableCell>File</TableCell>
      <TableCell className="text-center">{file.size}</TableCell>
    </TableRow>
  );
}

export function FolderRow(props: {
  folder: Folder;
  handleFolderClick: () => void;
}) {
  const { folder, handleFolderClick } = props;
  return (
    <TableRow key={folder.id}>
      <TableCell onClick={() => handleFolderClick()} className="flex gap-1">
        <FolderIcon size={20} />
        {folder.name}
      </TableCell>
      <TableCell>Folder</TableCell>
      <TableCell className="text-center">--</TableCell>
    </TableRow>
  );
}
