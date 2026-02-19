export type TechItem = {
  name: string;
  description: string;
  url: string;
};

export const TECH_STACK: TechItem[] = [
  {
    name: "Next.js 16",
    description: "React framework with App Router",
    url: "https://nextjs.org",
  },
  {
    name: "React 19",
    description: "UI library with Server Components",
    url: "https://react.dev",
  },
  {
    name: "TypeScript",
    description: "Type-safe JavaScript",
    url: "https://www.typescriptlang.org",
  },
  {
    name: "Tailwind CSS v4",
    description: "Utility-first CSS framework",
    url: "https://tailwindcss.com",
  },
  {
    name: "Biome",
    description: "Fast linter and formatter",
    url: "https://biomejs.dev",
  },
  {
    name: "Feature-Sliced Design",
    description: "Architectural methodology",
    url: "https://feature-sliced.design",
  },
];
