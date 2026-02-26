import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-current/10 px-3 py-1 font-mono text-xs opacity-70">
      {children}
    </span>
  );
}
