"use client";
import { Toaster } from "@/components/ui/toaster"
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"
import { trpc } from "./_trpc/client";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",inter.className)}>
            {children}
            <Toaster />
            </body>
    </html>
  );
}

export default trpc.withTRPC(RootLayout);