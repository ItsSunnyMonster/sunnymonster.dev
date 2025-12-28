// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credits",
  description: "Credits",
};

export default function Page() {
  return (
    <>
      <h1>Credits</h1>

      <p>
        This website&#39;s visual design was inspired by the{" "}
        <a
          className="underlined external"
          target="_blank"
          href="https://github.com/not-matthias/apollo/tree/main"
        >
          apollo
        </a>{" "}
        theme on the{" "}
        <a
          className="underlined external"
          target="_blank"
          href="https://getzola.org/"
        >
          zola SSG
        </a>
        , which I have heavily modified (especially after the rewrite in
        Next.js) to become what it looks like right now.
      </p>

      <h2>Other Thanks</h2>

      <ul>
        <li>
          Thanks to <strong>qu1rkit7</strong> for suggesting the{" "}
          <a
            target="_blank"
            href={"https://www.lexend.com/"}
            className="underlined external"
          >
            Lexend
          </a>{" "}
          font, it is so perfect I love it so much.
        </li>
        <li>
          Thanks to <strong>shakespaere</strong> for suggesting the placement of
          the hearts in my logo, it is so perfect I love it so much.
        </li>
        <li>
          Thanks to <strong>dino</strong> for suggesting the shape of the
          undercurl in my logo, it is so perfect I love it so much.
        </li>
      </ul>
    </>
  );
}
