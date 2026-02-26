import type { ReactNode } from "react";

export function SectionContainer({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="mb-8 font-mono text-sm font-medium tracking-widest uppercase opacity-50">
        {title}
      </h2>
      {children}
    </section>
  );
}
