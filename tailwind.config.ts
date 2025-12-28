// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/mdx-components.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-lexend)"],
        nav: ["var(--font-jetbrains)"],
        header: ["var(--font-space)"],
      },
      screens: {
        toc: "1410px",
        smnav: "830px",
        narrow: "600px",
      },
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: {
            del: {
              textDecorationThickness: "3px",
              textDecorationColor: "rgb(var(--ctp-yellow))",
            },
            a: {
              textDecoration: "none",
              "&:hover:not(.underlined)": {
                textDecoration: "underline",
              },
            },
            pre: {
              fontFamily: "var(--font-jetbrains)",
            },
            code: {
              fontFamily: "var(--font-jetbrains)",
            },
          },
        },
        catppuccin: {
          css: {
            "--tw-prose-body": "rgb(var(--ctp-text))",
            "--tw-prose-headings": "rgb(var(--ctp-text))",
            // "--tw-prose-lead": theme("colors.pink[700]"),
            "--tw-prose-links": "rgb(var(--ctp-yellow))",
            "--tw-prose-bold": "rgb(var(--ctp-text))",
            "--tw-prose-counters": "rgb(var(--ctp-subtext0))",
            "--tw-prose-bullets": "rgb(var(--ctp-subtext0))",
            "--tw-prose-hr": "rgb(var(--ctp-surface2))",
            "--tw-prose-quotes": "rgb(var(--ctp-subtext0))",
            "--tw-prose-quote-borders": "rgb(var(--ctp-yellow))",
            // "--tw-prose-captions": theme("colors.pink[700]"),
            "--tw-prose-code": "rgb(var(--ctp-text))",
            "--tw-prose-pre-code": "rgb(var(--ctp-text))",
            "--tw-prose-pre-bg": "rgb(var(--ctp-base))",
            "--tw-prose-th-borders": "rgb(var(--ctp-overlay2))",
            "--tw-prose-td-borders": "rgb(var(--ctp-surface2))",
            "--tw-prose-invert-body": "rgb(var(--ctp-text))",
            "--tw-prose-invert-headings": "rgb(var(--ctp-text))",
            // "--tw-prose-invert-lead": theme("colors.pink[300]"),
            "--tw-prose-invert-links": "rgb(var(--ctp-yellow))",
            "--tw-prose-invert-bold": "rgb(var(--ctp-text))",
            "--tw-prose-invert-counters": "rgb(var(--ctp-subtext0))",
            "--tw-prose-invert-bullets": "rgb(var(--ctp-subtext0))",
            "--tw-prose-invert-hr": "rgb(var(--ctp-surface2))",
            "--tw-prose-invert-quotes": "rgb(var(--ctp-subtext0))",
            "--tw-prose-invert-quote-borders": "rgb(var(--ctp-yellow))",
            // "--tw-prose-invert-captions": theme("colors.pink[400]"),
            "--tw-prose-invert-code": "rgb(var(--ctp-text))",
            "--tw-prose-invert-pre-code": "rgb(var(--ctp-text))",
            "--tw-prose-invert-pre-bg": "rgb(var(--ctp-base))",
            "--tw-prose-invert-th-borders": "rgb(var(--ctp-surface2))",
            "--tw-prose-invert-td-borders": "rgb(var(--ctp-surface1))",
          },
        },
      }),
    },
  },
  darkMode: ["selector"],
  plugins: [
    require("@catppuccin/tailwindcss"),
    require("@tailwindcss/typography"),
  ],
};
export default config;
