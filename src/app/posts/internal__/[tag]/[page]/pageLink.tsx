// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Button({
  disabled,
  action,
  handleClick,
}: {
  disabled: boolean;
  action: "prev" | "next";
  handleClick?: React.MouseEventHandler | undefined;
}) {
  return (
    <button
      className={`flex px-4 py-1 rounded-md hover:bg-surface0 ${disabled ? "cursor-not-allowed" : ""}`}
      onClick={handleClick}
    >
      {action === "prev" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className={`mr-2 inline w-3 my-auto ${disabled ? "fill-overlay2" : "fill-yellow"}`}
        >
          <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      ) : (
        <></>
      )}
      <span className={`${disabled ? "text-overlay2" : "text-yellow"}`}>
        {action === "prev" ? "Back" : "Next"}
      </span>
      {action === "next" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className={`ml-2 inline w-3 my-auto ${disabled ? "fill-overlay2" : "fill-yellow"}`}
        >
          <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
        </svg>
      ) : (
        <></>
      )}
    </button>
  );
}

function PageLink_Int({
  action,
  totalPages,
  forceDisabled,
}: {
  action: "prev" | "next";
  totalPages: number;
  forceDisabled: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const page = params.get("page") || "1";
  const pageNum = isNaN(Number(page)) ? 1 : Number(page);

  const targetPage = action === "prev" ? pageNum - 1 : pageNum + 1;

  const disabled = forceDisabled || targetPage <= 0 || targetPage > totalPages;

  const handleClick = () => {
    if (disabled) return;

    if (targetPage === 1) {
      params.delete("page");
    } else {
      params.set("page", targetPage.toString());
    }

    router.push(pathname + (params.toString() ? "?" + params.toString() : ""));
  };

  return (
    <Button disabled={disabled} handleClick={handleClick} action={action} />
  );
}

export function PageLink(props: {
  action: "prev" | "next";
  totalPages: number;
}) {
  return (
    <Suspense fallback={<Button disabled action={props.action} />}>
      <PageLink_Int forceDisabled={false} {...props} />
    </Suspense>
  );
}
