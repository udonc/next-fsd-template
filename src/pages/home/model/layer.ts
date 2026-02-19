export type Layer = {
  name: string;
  description: string;
  depends: string[];
};

export const LAYERS: Layer[] = [
  {
    name: "app",
    description: "Application initialization, global providers and styles",
    depends: ["all layers below"],
  },
  {
    name: "pages",
    description: "Full page compositions from widgets and features",
    depends: ["widgets", "features", "entities", "shared"],
  },
  {
    name: "widgets",
    description: "Composite UI blocks combining features and entities",
    depends: ["features", "entities", "shared"],
  },
  {
    name: "features",
    description: "User interactions and business scenarios",
    depends: ["entities", "shared"],
  },
  {
    name: "entities",
    description: "Domain models and their UI representations",
    depends: ["shared"],
  },
  {
    name: "shared",
    description: "Reusable utilities, UI kit, configs, and types",
    depends: [],
  },
];
