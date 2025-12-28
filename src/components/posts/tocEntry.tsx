// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { TocEntry } from "@stefanprobst/rehype-extract-toc";
import Link from "next/link";

export function TocEntryComponent({
  tocEntry,
  activeId,
}: {
  tocEntry: TocEntry;
  activeId: string | null;
}) {
  if (tocEntry.depth > 4) {
    return <></>;
  }

  return (
    <div className="max-w-full">
      <Link
        className={`truncate max-w-full block hover:underline ${activeId && activeId === tocEntry.id ? "text-text" : ""}`}
        href={`#${tocEntry.id!}`}
      >
        {tocEntry.value}
      </Link>
      {tocEntry.children ? (
        <div className="pl-6">
          {tocEntry.children!.map((child) => (
            <TocEntryComponent
              tocEntry={child}
              key={child.id}
              activeId={activeId}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
