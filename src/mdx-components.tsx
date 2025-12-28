// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { MDXComponents } from "mdx/types";
import {
  MarkdownImage,
  MarkdownLink,
  Sup,
  TitleLink,
} from "./components/markdown";

import Link from "next/link";
import Checkbox from "./components/checkbox";

export const CustomMDXComponents = (slug: string): MDXComponents => {
  return {
    wrapper: ({ children }) => (
      <article className="max-w-[65ch] fadeIn">{children}</article>
    ),
    sup: ({ children }) => <Sup>{children}</Sup>,
    a: ({ href, className, ...props }) => (
      <MarkdownLink href={href || ""} className={className || ""} {...props} />
    ),
    img: ({ alt, src, ...props }) => (
      <MarkdownImage alt={alt || ""} src={src || ""} slug={slug} {...props} />
    ),
    del: ({ children }) => (
      <del className="decoration-[3px] decoration-yellow">{children}</del>
    ),
    h2: ({ className, children, id, ...props }) => (
      <h2 id={id} className={`${className || ""} scroll-m-[100px]`} {...props}>
        {children} <TitleLink id={id} />{" "}
      </h2>
    ),
    h3: ({ className, children, id, ...props }) => (
      <h3 id={id} className={`${className || ""} scroll-m-[100px]`} {...props}>
        {children} <TitleLink id={id} />{" "}
      </h3>
    ),
    h4: ({ className, children, id, ...props }) => (
      <h4 id={id} className={`${className || ""} scroll-m-[100px]`} {...props}>
        {children} <TitleLink id={id} />{" "}
      </h4>
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={`${className || ""} ${className?.includes("contains-task-list") ? "not-prose my-[1.2em]" : ""}`}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li
        className={`${className || ""} ${className?.includes("task-list-item") ? "my-3 pl-2" : ""}`}
        {...props}
      />
    ),
    input: ({ type, checked, ...props }) => {
      if (type === "checkbox") {
        return <Checkbox checked={checked || false} />;
      } else {
        return <input type={type} checked={checked} {...props} />;
      }
    },
    Link,
  };
};

export function useMDXComponents(components1: MDXComponents): MDXComponents {
  return {
    ...CustomMDXComponents("__non-posts"),
    ...components1,
  };
}
