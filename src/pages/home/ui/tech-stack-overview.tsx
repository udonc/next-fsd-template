import { SectionContainer } from "@shared/ui/section-container";
import { TECH_STACK } from "../model/tech-item";
import { TechBadge } from "./tech-badge";

export function TechStackOverview() {
  return (
    <SectionContainer title="Tech Stack">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TECH_STACK.map((item) => (
          <TechBadge key={item.name} item={item} />
        ))}
      </div>
    </SectionContainer>
  );
}
