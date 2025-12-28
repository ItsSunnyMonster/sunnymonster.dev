// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import readingDuration from "reading-duration";
import { TocEntry } from "@stefanprobst/rehype-extract-toc";
import { compileMDX } from "next-mdx-remote/rsc";
import { CustomMDXComponents } from "../mdx-components";
import mdxOptions from "../mdxOptions";
import rehypeToc from "@stefanprobst/rehype-extract-toc";
import { ReactNode } from "react";
import rehypeShiki from "@shikijs/rehype";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMetadata {
  title: string;
  date: string;
  slug: string;
  description: string;
  tags: string[];
  readingTime: string;
}

export interface PostPageMetadata {
  title: string;
  date: string;
  updated: string | null;
  readingTime: string;
  content: ReactNode;
  toc: TocEntry[] | null;
  description: string;
}

interface Frontmatter {
  title: string | null;
  date: string | null;
  updated: string | null;
  description: string | null;
  tags: string[] | null;
}

export async function getPostsPaginated(
  index: string,
  offset: number,
  limit: number,
) {
  const buffer = await fs.readFile(path.join(postsDirectory, `${index}.bin`));
  const numberOfPosts = buffer.readUint32BE(0);

  const numberOfPostsToRead = Math.min(limit, numberOfPosts - offset);
  const isFinished = offset + limit >= numberOfPosts;

  const posts: PostMetadata[] = [];
  for (let i = offset; i < offset + numberOfPostsToRead; i++) {
    const slugOffset = buffer.readUint32BE(4 + i * 4);
    const slug = readStringFromBuffer(buffer, slugOffset);
    const readingTime = readStringFromBuffer(
      buffer,
      slugOffset + slug.length + 1,
    );

    const postFile = path.join(postsDirectory, `${slug}.mdx`);

    const fileContents = await fs.readFile(postFile, "utf8");
    const { data } = matter(fileContents);

    posts.push({
      slug: slug,
      title: data.title || "Why the heck did I not give a title to this",
      date: data.date || "0000-00-00",
      description: data.description || "No Description",
      tags: data.tags || [],
      readingTime,
    });
  }

  return {
    posts,
    read: numberOfPostsToRead,
    isFinished,
  };
}

export async function getPostSlugs() {
  const files = await fs.readdir(postsDirectory);

  const posts = await Promise.all(
    files
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map(async (fileName) => fileName.replace(/\.mdx?$/, "")),
  );

  return posts;
}

export async function getPosts(tag: string) {
  const files = await fs.readdir(postsDirectory);

  let posts: PostMetadata[] = await Promise.all(
    files
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map(async (fileName): Promise<PostMetadata> => {
        const filePath = path.join(postsDirectory, fileName);
        const fileContent = await fs.readFile(filePath);
        const { data, content } = matter(fileContent);

        const readingTime = readingDuration(content, { emoji: false });

        return {
          title: data.title || "Untitled",
          description: data.description || "No Description",
          slug: fileName.replace(/\.mdx?$/, ""),
          date: data.date || "0000-00-00",
          tags: data.tags || [],
          readingTime,
        };
      }),
  );

  if (tag !== "all__") {
    posts = posts.filter((post) => post.tags.includes(tag));
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const paginated: PostMetadata[][] = [];

  for (let i = 0; i < posts.length; i += 10) {
    paginated.push(posts.slice(i, i + 10));
  }

  return paginated;
}

export async function getAllTagPages() {
  const files = await fs.readdir(postsDirectory);

  const posts: { tags: string[] }[] = await Promise.all(
    files.map(async (fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContent = await fs.readFile(filePath);
      const { data } = matter(fileContent);

      return {
        tags: data.tags || [],
      };
    }),
  );

  const tagCounts: { [tag: string]: number } = {
    all__: posts.length,
  };

  posts.forEach(({ tags }) => {
    tags.forEach((tag) => {
      if (!tagCounts[tag]) {
        tagCounts[tag] = 0;
      }

      tagCounts[tag]++;
    });
  });

  const tagPages: { tag: string; page: string }[] = [];

  Object.entries(tagCounts).forEach(([tag, count]) => {
    const pages = Math.ceil(count / 10);

    for (let i = 1; i <= pages; i++) {
      tagPages.push({ tag, page: i.toString() });
    }
  });

  return tagPages;
}

export async function getPostBySlug(
  slug: string,
): Promise<PostPageMetadata | null> {
  try {
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, "utf8");

    let toc: TocEntry[] | undefined = [];

    const { frontmatter, content } = await compileMDX<Frontmatter>({
      source: fileContent,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          ...mdxOptions,
          rehypePlugins: [
            ...mdxOptions.rehypePlugins!,
            [
              rehypeShiki,
              {
                themes: {
                  light: "catppuccin-latte",
                  dark: "catppuccin-mocha",
                },
              },
            ],
            rehypeToc,
            () => {
              return function (_tree, file) {
                toc = file.data.toc;
              };
            },
          ],
        },
      },
      components: CustomMDXComponents(slug),
    });

    const readingTime = readingDuration(fileContent, { emoji: false });

    return {
      title: frontmatter.title || "Why the heck did I not give a title to this",
      date: frontmatter.date || "0000-00-00",
      updated: frontmatter.updated,
      readingTime,
      toc,
      content,
      description: frontmatter.description || "No description.",
    };
  } catch (error) {
    if (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      return null; // File doesn't exist
    }
    throw error; // Re-throw other errors
  }
}

function readStringFromBuffer(buffer: Buffer, offset: number) {
  let end = offset;

  while (end < buffer.length && buffer[end] !== 0) {
    end++;
  }

  return buffer.toString("utf8", offset, end);
}
