"use client";

import { useClipboard } from "../model/use-clipboard";

export function CopyCommandButton({ command }: { command: string }) {
  const { copied, copy } = useClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(command)}
      className="group flex w-full max-w-xl cursor-pointer items-center gap-3 rounded-lg border border-current/10 bg-current/5 px-4 py-3 font-mono text-sm transition-colors hover:border-current/25"
    >
      <span className="opacity-40">$</span>
      <span className="flex-1 text-left">{command}</span>
      <span className="shrink-0 text-xs opacity-40 transition-opacity group-hover:opacity-70">
        {copied ? "Copied!" : "Click to copy"}
      </span>
    </button>
  );
}
