// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import { PostPageMetadata } from "@/src/utils/getPosts";
import { useEffect, useMemo, useState } from "react";
import { TocEntry } from "@stefanprobst/rehype-extract-toc";
import { Toc } from "./toc";

export function PostContent({ post }: { post: PostPageMetadata }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const headers: string[] = useMemo(() => {
    const headers: string[] = [];

    const populateHeaders = (toc: TocEntry[]) => {
      toc.forEach((entry) => {
        headers.push(entry.id!);
        if (entry.children) {
          populateHeaders(entry.children);
        }
      });
    };

    if (post.toc) {
      populateHeaders(post.toc);
    }

    return headers;
  }, [post]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((closest, current) =>
            current.boundingClientRect.top < closest.boundingClientRect.top
              ? current
              : closest,
          );
          setActiveId(topEntry.target.id);
        }
      },
      {
        root: null, // Use the viewport as the root (default)
        rootMargin: "-110px 0px -70% 0px", // Adjusts when the intersection triggers
        threshold: 1.0, // Header must be fully visible
      },
    );

    headers.forEach((header) => {
      const element = document.getElementById(header);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headers]);

  return (
    <>
      <Toc post={post} activeId={activeId} enabled={headers.length != 0} />
      {post.content}
    </>
  );
}
