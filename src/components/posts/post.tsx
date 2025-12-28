// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import Link from "next/link";

export function Post({
  title,
  date,
  tags,
  description,
  slug,
  readingTime,
  activeTag,
}: {
  title: string;
  date: string;
  tags: string[];
  description: string;
  slug: string;
  readingTime: string;
  activeTag: string;
}) {
  return (
    <div className={`flex gap-3 mb-6`}>
      <div className="text-overlay2 font-medium text-nowrap">{date}</div>
      <div className="flex flex-col items-start min-w-0">
        <Link href={`/posts/${slug}`} className="underlined flex max-w-full">
          <div className="max-w-full truncate">{title}</div>
        </Link>
        <p className="text-overlay2">{description}</p>
        <div className="flex items-center gap-3 text-overlay2">
          <div className="text-nowrap">{readingTime}</div>
          {tags.length === 0 ? (
            <></>
          ) : (
            <>
              <div className="bg-overlay2 w-2 h-2 min-w-2 min-h-2 rounded-full"></div>
              <p>
                {tags.map((tag: string) => (
                  <Link
                    href={`${activeTag === tag ? "/posts" : `?tag=${tag}`}`}
                    className={`transition-colors text-overlay2 hover:text-yellow ${activeTag === tag ? "text-yellow font-bold" : ""
                      }`}
                    key={tag}
                  >
                    {`#${tag}`}{" "}
                  </Link>
                ))}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
