// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Post } from "@/src/components/posts/post";
import { getAllTagPages, getPosts } from "@/src/utils/getPosts";
import { notFound } from "next/navigation";
import { PageLink } from "./pageLink";
import { PageButton, PageInput } from "./pageButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
  description: "SunnyMonster's blog posts",
};

export async function generateStaticParams() {
  const pages = getAllTagPages();
  return pages;
}

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string; page: string }>;
}) {
  const awaitParams = await params;
  const tag = awaitParams.tag;
  const page = Number(awaitParams.page);

  if (isNaN(page)) {
    notFound();
  }

  const posts = await getPosts(tag);

  if (posts.length === 0) {
    notFound();
  }

  const pageToDisplay = posts[page - 1];

  if (!pageToDisplay) {
    notFound();
  }

  return (
    <>
      <h1>Posts</h1>
      <div className="not-prose fadeIn">
        <div className="fadeIn">
          {pageToDisplay.map((post) => (
            <Post
              slug={post.slug}
              description={post.description}
              title={post.title}
              tags={post.tags}
              date={post.date}
              key={post.slug}
              readingTime={post.readingTime}
              activeTag={tag}
            />
          ))}
        </div>
        {page === posts.length ? (
          <p className="text-center text-overlay2 mb-6">~ That&#39;s it :3 ~</p>
        ) : (
          <></>
        )}
        {posts.length > 1 ? (
          <div className="flex gap-2 justify-center items-center">
            <PageLink action="prev" totalPages={posts.length} />

            {/* SLOT 1 */}
            <PageButton targetPage={1} currentPage={page} />

            {/* SLOT 2 */}
            {page <= 3 ? (
              <PageButton targetPage={2} currentPage={page} />
            ) : (
              <PageInput totalPages={posts.length} />
            )}

            {/* SLOT 3 */}
            {posts.length < 3 ? (
              <></>
            ) : page <= 2 ? (
              <PageButton targetPage={3} currentPage={page} />
            ) : page >= posts.length - 1 ? (
              <PageButton targetPage={posts.length - 2} currentPage={page} />
            ) : (
              <PageButton targetPage={page} currentPage={page} />
            )}

            {/* SLOT 4 */}
            {posts.length < 4 ? (
              <></>
            ) : page >= posts.length - 2 ? (
              <PageButton targetPage={posts.length - 1} currentPage={page} />
            ) : (
              <PageInput totalPages={posts.length} />
            )}

            {/* SLOT 5 */}
            {posts.length < 5 ? (
              <></>
            ) : (
              <PageButton targetPage={posts.length} currentPage={page} />
            )}
            <PageLink action="next" totalPages={posts.length} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
