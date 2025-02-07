"use client";
"use client";

import { Upload } from "lucide-react";
import { Fragment, useMemo, useState } from "react";
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
import type { files, folders } from "~/server/db/schema";

export default function DriveContent(props: {
  files: (typeof files.$inferSelect)[];
  folders: (typeof folders.$inferSelect)[];
}) {
  const { files, folders } = props;
  const [currentFolder, setCurrentFolder] = useState<number>(1);

  const handleFolderClick = (folderId: number) => {
    setCurrentFolder(folderId);
  };

  const breadcrumbs = useMemo(() => {
    const breadcrumbs = [];
    let current = currentFolder;

    while (current !== 1) {
      const folder = folders.find((folder) => folder.id === current);
      if (folder) {
        breadcrumbs.unshift(folder);
        current = folder.parent ?? 1;
      } else {
        break;
      }
    }
    return breadcrumbs;
  }, [currentFolder, folders]);

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
                  <BreadcrumbLink href="#" onClick={() => setCurrentFolder(1)}>
                    My Drive
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.length > 0 && <BreadcrumbSeparator />}
                {breadcrumbs.map((folder, index) => (
                  <Fragment key={folder.id}>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="#"
                        onClick={() => handleFolderClick(folder.id)}
                      >
                        {folder.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
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
              <FolderRow
                key={folder.id}
                folder={folder}
                handleFolderClick={() => handleFolderClick(folder.id)}
              />
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
