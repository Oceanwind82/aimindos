"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  return (
    <button
      className="btn btn-primary font-display"
      onClick={() => setIsDark(d => !d)}
      aria-label="Toggle theme"
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
