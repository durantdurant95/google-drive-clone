"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { DB_FileType, DB_FolderType } from "~/server/db/schema";
import { UploadButton } from "./uploadthing";

export default function DriveContent(props: {
  files: DB_FileType[];
  folders: DB_FolderType[];
  parents: DB_FolderType[];
  currentFolderId: number;
}) {
  const { files, folders, parents } = props;

  const navigate = useRouter();

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
          <div className="flex gap-2">
            <ModeToggle />
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
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
        <UploadButton
          endpoint="imageUploader"
          className="mt-4"
          onClientUploadComplete={() => navigate.refresh()}
          input={{
            folderId: props.currentFolderId,
          }}
        />
      </div>
    </div>
  );
}
