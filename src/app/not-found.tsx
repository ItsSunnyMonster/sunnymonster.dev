// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 Not Found",
};

export default function Path() {
  return (
    <>
      <h1 className="after:hidden text-yellow">404 :(</h1>
      <p>
        The page you tried to visit does not exist.{" "}
        <Link className="underlined" href="/">
          Home
        </Link>
      </p>
    </>
  );
}
