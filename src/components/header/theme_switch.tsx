// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitch({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}></svg>
    );

  const maskId = Math.random();

  return (
    <svg
      className={`sun_and_moon ${className || ""}`}
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      onClick={() => setTheme(resolvedTheme == "dark" ? "light" : "dark")}
    >
      <circle
        className="sun"
        cx="12"
        cy="12"
        r="6"
        mask={`url(#${maskId})`}
        fill="currentColor"
      />
      <g className="sun-beams" stroke="currentColor">
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </g>
      <mask className="moon" id={maskId.toString()}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle cx="24" cy="10" r="6" fill="black" />
      </mask>
    </svg>
  );
}
