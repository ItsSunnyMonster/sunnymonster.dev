// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { usePathname } from "next/navigation";

export default function FadeTemplate({ children }: { children: ReactNode }) {
  const [key, setKey] = useState(0);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setKey((prevKey) => prevKey + 1);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  return (
    <div key={key} className={"fadeIn"}>
      {children}
    </div>
  );
}
