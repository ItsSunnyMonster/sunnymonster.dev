// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import GithubLogo from "../social_icons/github.svg";
import YoutubeLogo from "../social_icons/youtube.svg";
import BlueskyLogo from "../social_icons/bluesky.svg";
import SocialLink from "./header/social_link";
import NavLink from "./header/nav_link";
import ThemeSwitch from "./header/theme_switch";
import Icon from "./icon";
import { ReactNode, useEffect, useRef, useState } from "react";
import Hamburger from "./header/hamburger";
import { usePathname } from "next/navigation";

const navLinks: [string, string][] = [
  ["/posts", "::posts"],
  ["/about", "::about"],
  ["/fun-things", "::fun_things"],
];

const socialLinks: [string, ReactNode][] = [
  [
    "https://bsky.app/profile/sunnymonster.dev",
    <BlueskyLogo key={"bluesky_link"} />,
  ],
  ["https://github.com/ItsSunnyMonster", <GithubLogo key={"github_link"} />],
  [
    "https://youtube.com/@itssunnymonster",
    <YoutubeLogo key={"youtube_link"} />,
  ],
];

export default function Header() {
  const [navActive, setNavActive] = useState(false);

  const [headerBordered, setHeaderBordered] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        !hamburgerRef.current?.contains(event.target as Node)
      ) {
        if (navActive) {
          setNavActive(false);
        }
      }
    }

    function handleScroll() {
      if (navActive) {
        setNavActive(false);
      }
    }

    function handleResize() {
      if (navActive) {
        setNavActive(false);
      }
    }
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [navActive]);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY >= 40 != headerBordered) {
        setHeaderBordered(window.scrollY >= 40);
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerBordered]);

  useEffect(() => {
    setNavActive(false);
  }, [pathname]);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 w-svw px-8 flex justify-center
        items-center transition-all duration-300 border-b-2 ${navActive || headerBordered ? "bg-crust border-subtext0" : "border-[#ffffff00] bg-mantle"}
        ${headerBordered ? "py-2" : "py-6"}
        z-10
    `}
    >
      <div className="max-w-5xl w-full flex justify-center smnav:justify-between items-center max-narrow:justify-start">
        <div className="flex items-center gap-3">
          <Icon size={60} />
          <NavLink href={"/"} className="text-2xl">
            sunny_monster
          </NavLink>
          <div className="gap-2 hidden smnav:flex">
            {socialLinks.map(([link, logo]) => (
              <SocialLink href={link} key={link}>
                {logo}
              </SocialLink>
            ))}
          </div>
        </div>
        <div
          className={`
          absolute flex gap-3 items-center top-full right-0 
          smnav:static max-smnav:bg-crust max-smnav:p-8 max-smnav:rounded-bl-2xl 
          origin-top transition-all duration-300 max-smnav:scale-y-0 max-smnav:opacity-0 ${navActive ? "max-smnav:scale-y-100 max-smnav:opacity-100 max-smnav:border-subtext0 max-smnav:border-b-2 max-smnav:border-l-2" : ""}
          before:absolute before:bg-transparent before:right-full before:top-0 before:w-8 before:h-4 before:rounded-tr-2xl
          before:border-t-2 before:border-r-2 before:border-subtext0
          before:max-smnav:shadow-[1rem_0_0_0_rgb(var(--ctp-crust))]
        `}
          ref={navRef}
        >
          <div className="flex gap-3 flex-col items-end smnav:flex-row">
            {navLinks.map(([link, text]) => (
              <NavLink href={link} key={link}>
                {text}
              </NavLink>
            ))}
          </div>
          <div
            className={`
          gap-2 flex smnav:hidden flex-col max-smnav:border-surface2 max-smnav:border-l-2 max-smnav:pl-2 max-smnav:ml-1
        `}
          >
            {socialLinks.map(([link, logo]) => (
              <SocialLink href={link} key={link}>
                {logo}
              </SocialLink>
            ))}
          </div>
          <div className="hidden smnav:block">|</div>
          <ThemeSwitch className="hidden smnav:block" />
        </div>
        <div className="h-full absolute right-8 flex items-center gap-3">
          <ThemeSwitch className="block smnav:hidden" />
          <Hamburger
            active={navActive}
            onClick={() => setNavActive(!navActive)}
            ref={hamburgerRef}
          />
        </div>
      </div>
    </header>
  );
}
