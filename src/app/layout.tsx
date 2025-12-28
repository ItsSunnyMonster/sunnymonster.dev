// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Metadata } from "next";
import "./globals.scss";

import { Lexend, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import Header from "../components/header";
import { Providers } from "./providers";
import Footer from "../components/footer";
import { ScrollToTop } from "../components/scroll_to_top";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });
const jetbrains = localFont({
  src: [
    { path: "../../fonts/JetBrainsMono[wght].woff2", style: "normal" },
    { path: "../../fonts/JetBrainsMono-Italic[wght].woff2", style: "italic" },
  ],
  variable: "--font-jetbrains",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sunnymonster.dev"),
  title: { default: "sunny_monster", template: "%s | sunny_monster" },
  description: "SunnyMonster's personal site :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full scroll-smooth">
      <body
        className={`${lexend.variable} ${jetbrains.variable} ${spaceGrotesk.variable} min-h-full h-full selection:bg-yellow dark:selection:text-mantle font-body antialiased bg-mantle text-text text-xl flex flex-col items-center transition-colors duration-300`}
      >
        <Providers>
          <Header />
          <main
            className={`
            max-w-5xl w-full
            px-8 py-6 mt-36
          `}
          >
            <article
              className={`prose dark:prose-invert lg:prose-xl md:prose-lg prose-catppuccin max-w-none
                prose-h1:after:content-['.'] prose-h1:after:text-yellow prose-h1:after:text-7xl
                prose-h2:before:content-['##_'] prose-h2:before:text-yellow prose-h2:before:font-nav
                prose-h3:before:content-['###_'] prose-h3:before:text-yellow prose-h3:before:font-nav
                prose-h4:before:content-['####_'] prose-h4:before:text-yellow prose-h4:before:font-nav
              `}
            >
              {children}
            </article>
          </main>
          <ScrollToTop />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
