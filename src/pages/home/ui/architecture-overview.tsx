import { SectionContainer } from "@shared/ui";
import { LAYERS } from "../model/layer";
import { LayerCard } from "./layer-card";

export function ArchitectureOverview() {
  return (
    <SectionContainer title="Architecture">
      <p className="mb-6 text-sm opacity-60">
        Feature-Sliced Design organizes code into layers with strict dependency
        rules. Each layer can only depend on the layers below it.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {LAYERS.map((layer) => (
          <LayerCard key={layer.name} layer={layer} />
        ))}
      </div>
    </SectionContainer>
  );
}
