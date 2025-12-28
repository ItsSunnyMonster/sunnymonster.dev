// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import styles from "./pageInput.module.css";

function PageButton_Int({
  targetPage,
  currentPage,
}: {
  targetPage: number;
  currentPage: number;
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (currentPage === targetPage) return;

    if (targetPage === 1) {
      params.delete("page");
    } else {
      params.set("page", targetPage.toString());
    }

    router.push(pathname + (params.toString() ? "?" + params.toString() : ""));
  };

  return (
    <button
      className={`rounded-full w-10 h-10 ${targetPage === currentPage ? "bg-yellow text-mantle" : "hover:bg-surface0"}`}
      onClick={handleClick}
    >
      {targetPage.toString()}
    </button>
  );
}

function PageInput_Int({ totalPages }: { totalPages: number }) {
  const [input, setInput] = useState(false);

  const [inputState, setInputState] = useState<number | null>(null);
  const [animateButton, setAnimateButton] = useState(false);

  const [inputInvalid, setInputInvalid] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();

    if (newValue.trim().length === 0) {
      setInputState(null);

      if (inputInvalid) {
        setInputInvalid(false);
      }

      return;
    }

    const valueNumber = Number(newValue);

    if (!isNaN(valueNumber)) {
      if (inputInvalid) {
        setInputInvalid(false);
      }

      setInputState(valueNumber);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!inputState) {
        if (!inputInvalid) setInputInvalid(true);
        return;
      }

      if (inputState > totalPages || inputState < 1) {
        if (!inputInvalid) setInputInvalid(true);
        return;
      }

      if (inputState === 1) {
        params.delete("page");
      } else {
        params.set("page", inputState.toString());
      }

      router.push(
        pathname + (params.toString() ? "?" + params.toString() : ""),
      );
    }
  };

  if (input) {
    return (
      <>
        <input
          type="text"
          className={`w-10 h-10 rounded-full p-2 bg-surface0 text-text outline-none appearance-none ${styles.animateIn} ${inputInvalid ? "border-2 border-red" : ""}`}
          autoFocus
          onChange={handleChange}
          onBlur={() => setInput(false)}
          onKeyDown={handleKeyDown}
          value={inputState || ""}
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </>
    );
  } else {
    return (
      <button
        className={`hover:bg-surface0 ${animateButton ? `rounded-md w-14 h-10 ${styles.animateOut}` : "rounded-full w-10 h-10"}`}
        onClick={() => {
          setInput(true);
          if (!animateButton) {
            setAnimateButton(true);
          }
        }}
      >
        ...
      </button>
    );
  }
}

export function PageButton(props: { targetPage: number; currentPage: number }) {
  return (
    <Suspense
      fallback={
        <button className="rounded-full w-10 h-10 text-overlay2 cursor-not-allowed">
          {props.targetPage.toString()}
        </button>
      }
    >
      <PageButton_Int {...props} />
    </Suspense>
  );
}

export function PageInput(props: { totalPages: number }) {
  return (
    <Suspense
      fallback={
        <button className="cursor-not-allowed w-10 h-10 rounded-full text-overlay2">
          ...
        </button>
      }
    >
      <PageInput_Int {...props} />
    </Suspense>
  );
}
