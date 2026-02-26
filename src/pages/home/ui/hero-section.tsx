import { TEMPLATE } from "@shared/config/template";
import { Badge } from "@shared/ui/badge";
import { CopyCommandButton } from "./copy-command-button";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <div className="mb-6 flex justify-center gap-2">
        <Badge>Next.js 16</Badge>
        <Badge>FSD</Badge>
        <Badge>TypeScript</Badge>
      </div>
      <h1 className="mb-4 font-mono text-4xl font-bold tracking-tight sm:text-5xl">
        {TEMPLATE.name}
      </h1>
      <p className="mx-auto mb-10 max-w-lg text-lg opacity-60">
        {TEMPLATE.description}
      </p>
      <div className="flex justify-center">
        <CopyCommandButton command={TEMPLATE.createCommand} />
      </div>
    </section>
  );
}
