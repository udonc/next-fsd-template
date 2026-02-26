import { TEMPLATE } from "@shared/config/template";
import { ExternalLink } from "@shared/ui/external-link";

export function Footer() {
  return (
    <footer className="border-t border-current/10 py-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 text-sm opacity-50">
        <div className="flex gap-6">
          <ExternalLink href={TEMPLATE.fsdDocsUrl}>
            Feature-Sliced Design
          </ExternalLink>
          <ExternalLink href={TEMPLATE.repoUrl}>GitHub</ExternalLink>
        </div>
        <p className="font-mono text-xs">
          Built with Next.js, TypeScript &amp; FSD
        </p>
      </div>
    </footer>
  );
}
