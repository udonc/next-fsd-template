# pages/ (ダミーディレクトリ)

このディレクトリは**意図的に空**にしてある。削除しないこと。

## なぜ必要か

Next.js は `pages/` ディレクトリを探すとき、ルートを優先し、なければ `src/pages/` にフォールバックする。
このプロジェクトでは FSD の pages レイヤーとして `src/pages/` を使っているが、ルートに `pages/` がないと Next.js が `src/pages/` を Pages Router として誤認し、ビルドエラーになる。

ルートに空の `pages/` を置くことで `src/pages/` の誤認を防いでいる。

### 副作用と対処

`pages/` が存在すると Next.js は `next-env.d.ts` に compat 型を追加し、`usePathname()` 等の返り値が `string | null` に変わる。
これは `override-navigation.d.ts` で App Router 本来の型に上書きして対処している。
