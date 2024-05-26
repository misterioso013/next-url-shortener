import Link from "next/link";
import { MountainIcon } from "./icons";

export function Header() {
    return(
        <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Url Shortener</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="https://all.dev.br" target="_blank">
            Our Work
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="https://github.com/misterioso013/next-url-shortener#readme" target="_blank">
            Pricing
          </Link>
        </nav>
      </header>
    )
}