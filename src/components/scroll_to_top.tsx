// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import { useEffect, useState } from "react";
import UpIcon from "../svgs/up.svg";

export function ScrollToTop() {
  const scroll = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeVisible = window.scrollY > 1000;

      if (isVisible != shouldBeVisible) {
        setIsVisible(shouldBeVisible);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  return (
    <button
      className={`fixed z-50 right-5 bottom-5 narrow:right-20 narrow:bottom-20 p-3 bg-text rounded-full transition-all duration-300 ${isVisible ? "translate-y-0" : "translate-y-[200px]"}`}
      onClick={scroll}
    >
      <UpIcon className="w-[24px] h-[24px] fill-mantle" />
    </button>
  );
}
