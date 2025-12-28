// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "hmm! dynamic?" },
  description: "Literally ANYTHING can happen here.",
};

export default function DynamicPage() {
  return (
    <>
      <h1>Dynamic Page</h1>
      <p>
        yeah it did change. kudos if you noticed this cause it has been a really
        long time.
      </p>
    </>
  );
}
