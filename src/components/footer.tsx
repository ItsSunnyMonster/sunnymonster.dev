// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import Link from "next/link";
import Icon from "./icon";

export default function Footer() {
  return (
    <footer
      className={`
      bg-crust
      mt-auto p-8 w-full
      flex justify-center items-center gap-3 narrow:gap-6
      text-[15px]
      transition-colors duration-300
    `}
    >
      <Icon size={100} />

      <div className="flex flex-col narrow:items-center">
        <p className="text-overlay0">
          made with ❤️ by sunnymonster (they/them)
        </p>
        <p className="text-overlay0">
          © 2026 SunnyMonster.
          <br className="inline narrow:hidden" />
          <span className="hidden narrow:inline-block align-middle w-1 h-1 bg-overlay0 rounded-full mx-2"></span>
          <Link
            href={"/credits"}
            className="text-blue transition-colors duration-300 hover:underline hover:text-subtext0"
          >
            credits
          </Link>
          <br className="inline narrow:hidden" />
          <span className="hidden narrow:inline-block align-middle w-1 h-1 bg-overlay0 rounded-full mx-2"></span>
          <Link
            href={"https://github.com/ItsSunnyMonster/sunnymonster.dev"}
            className="text-blue transition-colors duration-300 hover:underline hover:text-subtext0 external"
          >
            source
          </Link>
          <br className="inline narrow:hidden" />
          <span className="hidden narrow:inline-block align-middle w-1 h-1 bg-overlay0 rounded-full mx-2"></span>
          <Link
            href={"/license"}
            className="text-blue transition-colors duration-300 hover:underline hover:text-subtext0"
          >
            license
          </Link>
        </p>
      </div>
    </footer>
  );
}
