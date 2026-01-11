// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

export const mdxBundlerOptions = {
  remarkPlugins: [require.resolve("remark-gfm")],
  rehypePlugins: [require.resolve("rehype-slug")],
};

export const mdxRuntimeOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug],
};
