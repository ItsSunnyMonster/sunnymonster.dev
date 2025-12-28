// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import LinkIcon from "../svgs/link.svg";

const SupContext = createContext(false);

const isExternalLink = (href: string): boolean => {
  try {
    const url = new URL(href, window.location.origin);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
};

export const Sup = ({ children }: { children: ReactNode }) => (
  <SupContext.Provider value={true}>
    <sup>{children}</sup>
  </SupContext.Provider>
);

export const MarkdownLink = ({
  className,
  href,
  ...props
}: {
  className: string;
  href: string;
}) => {
  const isInSup = useContext(SupContext);

  const [isExternal, setIsExternal] = useState(false);

  useEffect(() => {
    setIsExternal(isExternalLink(href));
  }, [href]);

  const isUnderlined = !isInSup && !className.includes("data-footnote-backref");

  if (isExternal) {
    return (
      <a
        href={href}
        className={`${className} external ${isUnderlined ? "underlined" : "no-underline hover:underline"}`}
        target="_blank"
        {...props}
      />
    );
  } else {
    return (
      <Link
        href={href}
        className={`${className} ${isUnderlined ? "underlined" : "no-underline hover:underline"}`}
        {...props}
      />
    );
  }
};

export const MarkdownImage = ({
  alt = "",
  src,
  slug,
  ...props
}: {
  alt: string;
  src: string;
  slug: string;
}) => {
  return (
    <Image
      alt={alt}
      className="mx-auto rounded-lg"
      src={`/assets/posts/${slug}/${src}`}
      width={800}
      height={800}
      {...props}
    />
  );
};

export const TitleLink = ({ id }: { id: string | undefined }) => {
  return (
    <a href={`${id ? `#${id}` : ""}`}>
      <LinkIcon className="fill-yellow inline h-[.8em] w-auto" />
    </a>
  );
};
