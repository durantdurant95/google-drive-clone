import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createRootFolder } from "~/server/db/mutations";
import { getRootFolderForUser } from "~/server/db/queries";

export default async function DrivePage() {
  const session = await auth();

  if (!session.userId) {
    redirect("/sign-in");
  }

  let rootFolder = await getRootFolderForUser(session.userId);

  if (!rootFolder) {
    await createRootFolder({ userId: session.userId });
    rootFolder = await getRootFolderForUser(session.userId);
  }

  redirect(`/f/${rootFolder?.id}`);
}
