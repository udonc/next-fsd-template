import { TEMPLATE } from "@shared/config/template";
import { ExternalLink } from "@shared/ui/external-link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-current/10 bg-[var(--background)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <span className="font-mono text-sm font-semibold">{TEMPLATE.name}</span>
        <ExternalLink href={TEMPLATE.repoUrl}>GitHub</ExternalLink>
      </div>
    </header>
  );
}
