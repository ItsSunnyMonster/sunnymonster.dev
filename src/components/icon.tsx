// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Icon({ size }: { size: number }) {
  const { resolvedTheme } = useTheme();
  const [imageSrc, setImageSrc] = useState("/logo_dark.png");

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setImageSrc("/logo_dark.png");
    } else {
      setImageSrc("/logo_light.png");
    }
  }, [resolvedTheme]);

  return (
    <Image
      src={imageSrc}
      alt={"SunnyMonster Logo"}
      width={size}
      height={size}
    />
  );
}
