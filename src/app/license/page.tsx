// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import Link from "next/link";

export default function Page() {
    return <>
        <h1>License</h1>

        <p>
            <Link className="underlined external" href="https://codeberg.org/SunnyMonster/sunnymonster.dev">The source repository</Link> of this website follows the <Link className="underlined external" href="https://reuse.software">REUSE</Link> specification.
            You may check it for the specific licenses applying to each file. Below is a summary (if anything seems wrong, always refer to the REUSE headers as the "source of truth").
        </p>

        <h2>Source Files</h2>
        <p>
            This includes the <code>ts(x)</code>, <code>(s)css</code>, etc. files which makes up this website (mostly in the <code>src</code> directory).<br />
            These files are licensed under the <Link className="underlined external" href={"https://codeberg.org/SunnyMonster/sunnymonster.dev/src/branch/master/LICENSES/AGPL-3.0-or-later.txt"}>AGPL 3.0 or later</Link> license.
        </p>

        <h2>Posts</h2>
        <p>
            This includes all the write-ups on this website (mostly <code>mdx</code> files), and some pictures attached to them.<br />
            They are licensed under the <Link className="underlined external" href={"https://codeberg.org/SunnyMonster/sunnymonster.dev/src/branch/master/LICENSES/CC-BY-SA-4.0.txt"}>Creative Commons Attribution Sharealike 4.0</Link> license.
        </p>

        <h2>My Logo</h2>
        <p>
            All rights reserved. If you for some reason decide to make a copy of my website, you must use your own logo instead.
        </p>

        <h2>Other Assets</h2>
        <p>
            The other assets I've used, such as font awesome icons or Jetbrains Mono, are all licensed under their appropriate licenses.
        </p>
    </>
}
