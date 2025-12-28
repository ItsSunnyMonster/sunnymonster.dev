// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export default function NavLink({
  href,
  className,
  children,
}: PropsWithChildren<{
  href: string;
  className?: string;
}>) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={`${className || ""} font-nav font-[480] underlined ${path === href ? "font-extrabold" : ""}`}
    >
      {children}
    </Link>
  );
}
