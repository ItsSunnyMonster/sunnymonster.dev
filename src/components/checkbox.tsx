// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export default function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={`inline-block w-5 h-5 my-auto mr-2 align-middle border-2 ${checked ? "border-yellow bg-yellow" : "border-text "}`}
    >
      <svg
        role="graphics-symbol"
        viewBox="0 0 14 14"
        className={`w-4 max-w-4 h-4 max-h-4 fill-mantle ${checked ? "opacity-100" : "opacity-0"}`}
      >
        <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
      </svg>
    </span>
  );
}
