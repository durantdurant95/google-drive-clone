import { FileIcon, FolderIcon } from "lucide-react";
import Link from "next/link";
import type { DB_FolderType, files_table } from "~/server/db/schema";
import { TableCell, TableRow } from "./ui/table";

export function FileRow(props: { file: typeof files_table.$inferSelect }) {
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

export function FolderRow(props: { folder: DB_FolderType }) {
  const { folder } = props;
  return (
    <TableRow key={folder.id}>
      <TableCell>
        <Link href={`/f/${folder.id}`} className="flex gap-1">
          <FolderIcon size={20} />
          {folder.name}
        </Link>
      </TableCell>
      <TableCell>Folder</TableCell>
      <TableCell className="text-center">--</TableCell>
    </TableRow>
  );
}
