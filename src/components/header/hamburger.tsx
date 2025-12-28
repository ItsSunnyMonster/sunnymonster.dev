// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import { RefObject } from "react";
import styles from "./hamburger.module.css";

export default function Hamburger({
  className,
  active,
  ref,
  onClick,
}: {
  className?: string;
  active: boolean;
  ref: RefObject<HTMLDivElement>;
  onClick?: () => void;
}) {
  return (
    <div
      className={`${className || ""} ${styles.hamburger} ${active ? styles.active : ""}`}
      onClick={onClick}
      ref={ref}
    >
      <span></span>
    </div>
  );
}
