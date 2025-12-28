// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import { useState } from "react";

export default function PronounName() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <span className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>Sunny{isExpanded ? " (they/them)" : ""}</span>
    )
}
