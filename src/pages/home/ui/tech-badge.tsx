import { ExternalLink } from "@shared/ui";
import type { TechItem } from "../model/tech-item";

export function TechBadge({ item }: { item: TechItem }) {
  return (
    <div className="rounded-lg border border-current/10 p-4 transition-colors hover:border-current/25">
      <h3 className="mb-1 font-mono text-sm font-semibold">
        <ExternalLink href={item.url}>{item.name}</ExternalLink>
      </h3>
      <p className="text-xs opacity-50">{item.description}</p>
    </div>
  );
}
