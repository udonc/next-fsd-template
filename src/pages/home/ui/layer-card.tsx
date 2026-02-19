import { Badge } from "@shared/ui";
import type { Layer } from "../model/layer";

export function LayerCard({ layer }: { layer: Layer }) {
  return (
    <div className="rounded-lg border border-current/10 p-4">
      <div className="mb-2 flex items-center gap-3">
        <h3 className="font-mono text-base font-semibold">{layer.name}/</h3>
      </div>
      <p className="mb-3 text-sm opacity-60">{layer.description}</p>
      {layer.depends.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {layer.depends.map((dep) => (
            <Badge key={dep}>{dep}</Badge>
          ))}
        </div>
      )}
    </div>
  );
}
