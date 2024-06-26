import Link from "next/link";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swift Cut - Trim audio files online",
  description: "Trim audio files online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`w-screen h-screen ${nunito.className} dark:bg-black dark:text-white`}
    >
      <body className="h-screen w-screen">
        <nav className="border-b border-gray-900 flex items-center justify-between absolute top-0 left-0 z-30 w-full bg-transparent backdrop-blur-sm h-24 px-20">
          <Link
            className="text-3xl transition hover:-translate-y-1 -rotate-45"
            href="/"
            title="Home"
          >
            ✂️
          </Link>

          <a href="https://github.com/ryanpunwasi/swift-cut" target="_blank">
            <img
              src="/github.svg"
              alt="github icon"
              className="block h-7 w-7 transition ease-in-out duration-200 hover:-translate-y-1"
              style={{ filter: "invert(1)" }}
            />
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}
