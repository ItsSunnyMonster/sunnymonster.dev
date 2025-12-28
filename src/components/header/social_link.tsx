// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { cloneElement, isValidElement, PropsWithChildren } from "react";

export default function SocialLink({
  href,
  children,
}: PropsWithChildren<{
  href: string;
}>) {
  return (
    <a
      target="_blank"
      href={href}
      className="group p-1.5 transition-colors rounded-md hover:bg-yellow flex items-center"
    >
      {isValidElement(children) &&
        cloneElement(children as React.ReactElement, {
          className: `${children.props.className || ""} transition-colors w-4 max-w-4 fill-text dark:group-hover:fill-mantle`,
        })}
    </a>
  );
}
