import { SignInButton } from "@clerk/nextjs";
import { HardDrive } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="/">
          <HardDrive className="mr-2 h-6 w-6" />
          <span className="font-bold">CloudDrive</span>
        </Link>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center space-y-4">
        <h3 className="text-2xl font-bold sm:text-3xl">
          Sign in to your account
        </h3>
        <SignInButton forceRedirectUrl="/drive" />
      </main>
      <footer className="py-4 text-center text-sm">
        © 2023 CloudDrive. All rights reserved.
      </footer>
    </div>
  );
}
