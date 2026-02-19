// Next.js compat navigation 型の上書き。
// `app/` と `pages/` が両方存在すると、Next.js が
// `next/navigation-types/compat/navigation` を追加して返り値の型に `null` を含めてしまう。
// ルートの `pages/` は `src/pages/`（FSD pages レイヤー）が Pages Router として
// 誤認されるのを防ぐためのダミーなので、ここで App Router 本来の型に復元する。
import type { ReadonlyURLSearchParams } from "next/navigation";

declare module "next/navigation" {
  export function usePathname(): string;
  export function useSearchParams(): ReadonlyURLSearchParams;
  export function useParams<
    T extends Record<string, string | string[]> = Record<
      string,
      string | string[]
    >,
  >(): T;
  export function useSelectedLayoutSegments(): string[];
  export function useSelectedLayoutSegment(): string | null;
}
