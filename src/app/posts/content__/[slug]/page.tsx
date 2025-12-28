// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { PostContent } from "@/src/components/posts/postContent";
import { Separator } from "@/src/components/separator";
import { getPostBySlug, getPostSlugs } from "@/src/utils/getPosts";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <h1>{post.title}</h1>
      <div className="flex smnav:items-center gap-3 text-overlay2 max-smnav:flex-col">
        <div className="text-nowrap">Posted on {post.date}</div>
        <Separator />
        {(() => {
          if (post.updated) {
            return (
              <>
                <div className="text-nowrap">
                  Last updated on {post.updated}
                </div>
                <Separator />
              </>
            );
          } else {
            return <></>;
          }
        })()}
        <div className="text-nowrap">{post.readingTime}</div>
      </div>

      <PostContent post={post} />
    </>
  );
}
