"use client";

import type { CSSProperties, ReactNode } from "react";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={className} style={delay ? { "--reveal-delay": `${delay}s` } as CSSProperties : undefined}>
      {children}
    </div>
  );
}
