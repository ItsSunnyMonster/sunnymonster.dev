// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import { PostPageMetadata } from "@/src/utils/getPosts";
import { createPortal } from "react-dom";
import { TocEntryComponent } from "./tocEntry";
import { useEffect, useState } from "react";

export function Toc({
  post,
  activeId,
  enabled = true,
}: {
  post: PostPageMetadata;
  activeId: string | null;
  enabled: boolean | null;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (!enabled) {
    return <></>;
  }

  return createPortal(
    <div className="hidden leading-relaxed max-w-none fixed toc:flex right-0 top-0 h-full mr-12 text-overlay2">
      <nav
        className={`not-prose relative my-auto max-h-[60%] overflow-x-hidden max-w-[320px] min-w-[320px] pl-6 py-10 fadeIn before:absolute before:left-0 before:h-[70%] before:bg-surface2 before:w-[2px] before:top-[15%]`}
      >
        {post.toc?.map((entry) => (
          <TocEntryComponent
            tocEntry={entry}
            key={entry.id}
            activeId={activeId}
          />
        ))}
      </nav>
    </div>,
    document.body,
  );
}
