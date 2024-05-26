import type { Metadata } from "next";
import Link from "next/link"
import { Header } from "@/components/header";
import { Short } from "@/components/short";

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Shorten your long URLs to make them easier to share. Enter your URL below to get started.",
};

export default function Home() {
  
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 lg:py-24 xl:py-32 xl:h-screen">
          <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:px-6 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif">URL Shortener</h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Shorten your long URLs to make them easier to share. Enter your URL below to get started.
              </p>
            </div>
            <Short />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                How about we work together?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We are always looking for new opportunities to collaborate with new people. If you are interested in working
                with us, please sign up below.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              
                <Link href="https://all.dev.br" target="_blank" className="block w-full bg-red-800 p-3 text-white rounded-lg">Let&apos;s work together</Link>
              
              <p className="text-xs text-gray-500 dark:text-gray-400">
                We promise not to disappoint you. We are looking forward to working with you.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} All Rights Reserved</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="https://github.com/misterioso013">
            My GitHub
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="https://github.com/misterioso013/next-url-shortener">
            Documentation
          </Link>
        </nav>
      </footer>
    </div>
  )
}
