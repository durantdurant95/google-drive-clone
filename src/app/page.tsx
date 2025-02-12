import { auth } from "@clerk/nextjs/server";
import { HardDrive, Lock, Share2, Zap } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <HardDrive className="mr-2 h-6 w-6" />
          <span className="font-bold">CloudDrive</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-8">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your files, anywhere, anytime
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Secure cloud storage with easy sharing and real-time
                  collaboration. Just like Google Drive, but better.
                </p>
              </div>
              <form
                action={async () => {
                  "use server";
                  const session = await auth();
                  if (!session.userId) {
                    return redirect("/sign-in");
                  }
                  return redirect("/drive");
                }}
                className="space-x-4"
              >
                <Button>Get Started</Button>
              </form>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <Share2 className="text-primary h-12 w-12" />
                <h2 className="text-xl font-bold">Easy Sharing</h2>
                <p className="text-sm">Share files and folders with anyone.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Lock className="text-primary h-12 w-12" />
                <h2 className="text-xl font-bold">Secure Storage</h2>
                <p className="text-sm">
                  Your files are encrypted and stored securely in the cloud.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Zap className="text-primary h-12 w-12" />
                <h2 className="text-xl font-bold">Fast Sync</h2>
                <p className="text-sm">
                  Changes sync instantly across all your devices.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs">© 2025 CloudDrive. All rights reserved.</p>
      </footer>
    </div>
  );
}
