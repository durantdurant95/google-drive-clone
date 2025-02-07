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
import { mockFiles, mockFolders } from "../lib/mock-data";

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<string>("root");

  const getCurrentFiles = () => {
    return mockFiles.filter((file) => file.parent === currentFolder);
  };

  const getCurrentFolders = () => {
    return mockFolders.filter((folder) => folder.parent === currentFolder);
  };

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
  };

  const breadcrumbs = useMemo(() => {
    const breadcrumbs = [];
    let current = currentFolder;

    while (current !== "root") {
      const folder = mockFolders.find((folder) => folder.id === current);
      if (folder) {
        breadcrumbs.unshift(folder);
        current = folder.parent ?? "root";
      } else {
        break;
      }
    }
    return breadcrumbs;
  }, [currentFolder]);

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
                  <BreadcrumbLink
                    href="#"
                    onClick={() => setCurrentFolder("root")}
                  >
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
            {getCurrentFolders().map((folder) => (
              <FolderRow
                key={folder.id}
                folder={folder}
                handleFolderClick={() => handleFolderClick(folder.id)}
              />
            ))}
            {getCurrentFiles().map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
