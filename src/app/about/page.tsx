// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import PronounName from "@/src/components/pronoun_name";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About Me",
};

export default function Page() {
  return (
    <>
      <h1>About</h1>

      <p>
        Hi! I&#39;m <PronounName />, and this is
        my personal website{" "}
        Here you will find my{" "}
        <Link href={"/posts"} className="underlined">
          blogs
        </Link>{" "}
        where I will occasionally share things that I happen to be doing at any
        given time.
      </p>
    </>
  );
}
