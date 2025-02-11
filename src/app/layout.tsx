import { ClerkProvider } from "@clerk/nextjs";
import "@uploadthing/react/styles.css";
import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import { Toaster } from "~/components/ui/sonner";
import { cn } from "~/lib/utils";
import "~/styles/globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Google Drive Clone",
  description: "App inspired by Google Drive, using cool stuff",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn(geist.className, "dark")}
        style={{ colorScheme: "dark" }}
      >
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
