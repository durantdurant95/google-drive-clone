"use client";

import { ChevronRight, Upload } from "lucide-react";
import { useState } from "react";
import { FileRow, FolderRow } from "~/components/file-row";
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

  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentId = currentFolder;

    while (currentId !== null) {
      const folder = mockFiles.find((file) => file.id === currentId);
      if (folder) {
        breadcrumbs.unshift(folder);
        currentId = folder.parent ?? "root";
      } else {
        break;
      }
    }

    return breadcrumbs;
  };

  const handleUpload = () => {
    alert("Upload functionality would be implemented here");
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button onClick={() => setCurrentFolder("root")} variant="ghost">
              My Drive
            </Button>
            {getBreadcrumbs().map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2" size={16} />
                <Button
                  onClick={() => handleFolderClick(folder.id)}
                  variant="ghost"
                >
                  {folder.name}
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={handleUpload}>
            <Upload className="mr-2" size={20} />
            Upload
          </Button>
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
