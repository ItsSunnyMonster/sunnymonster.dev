// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const options = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug],
};

export default options;
