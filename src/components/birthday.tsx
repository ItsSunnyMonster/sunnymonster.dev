// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import { useEffect, useState } from "react";

function vowel(x: number) {
  if (x <= 1) {
    return false;
  }

  const string = x.toString();

  if (string.startsWith("8")) {
    return true;
  }

  if (x == 11 || x == 18) {
    return true;
  }

  if (
    string.startsWith("1") &&
    (string.length % 3 == 1 || string.length % 3 == 0)
  ) {
    return true;
  }

  if (string.startsWith("18") && string.length % 3 == 2) {
    return true;
  }

  return false;
}

export default function Birthday() {
  const [age, setAge] = useState(-1);

  useEffect(() => {
    async function getAge() {
      const res = await fetch("/api/get-age");
      if (res.ok) {
        const json = await res.json();
        setAge(json.age);
      } else {
        console.error("Failed to get age:", res.json());
      }
    }

    getAge();
  });

  if (age == -1) {
    return <span>a </span>;
  } else {
    return (
      <span>
        {vowel(age) ? "an" : "a"} {age.toLocaleString()} year-old{" "}
      </span>
    );
  }
}
