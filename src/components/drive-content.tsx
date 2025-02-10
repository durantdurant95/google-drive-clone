"use client";
"use client";

import { Upload } from "lucide-react";
import { Fragment } from "react";
import { FileRow, FolderRow } from "~/components/file-row";
import ModeToggle from "~/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { files_table, folders_table } from "~/server/db/schema";

export default function DriveContent(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
}) {
  const { files, folders, parents } = props;

  const handleUpload = () => {
    alert("Upload functionality would be implemented here");
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/f/1">My Drive</BreadcrumbLink>
                </BreadcrumbItem>
                {parents?.length > 0 && <BreadcrumbSeparator />}
                {parents?.map((folder, index) => (
                  <Fragment key={folder.id}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={`/f/${folder.id}`}>
                        {folder.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < props.parents.length - 1 && (
                      <BreadcrumbSeparator />
                    )}
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Button onClick={handleUpload}>
            <Upload className="mr-2" size={20} />
            Upload
          </Button>
          <ModeToggle />
        </div>
        <Table>
          <TableCaption>All your folders and files at your reach</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-center">Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
