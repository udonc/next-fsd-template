# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 + TypeScript template implementing **Feature-Sliced Design (FSD)** architecture. Uses Biome (not ESLint/Prettier) for linting and formatting. Tailwind CSS v4 for styling. Package manager is **pnpm**.

## Commands

- `pnpm dev` — 開発サーバー起動
- `pnpm build` — プロダクションビルド
- `pnpm start` — プロダクションサーバー起動
- `pnpm lint` — Biome lint (`biome check`)
- `pnpm format` — Biome format (`biome format --write`)

テストフレームワークは未導入。コード変更後は `pnpm lint` で FSD ルール違反がないか必ず確認すること。

## Architecture: Feature-Sliced Design (FSD)

### Layer Hierarchy

依存は上から下方向のみ許可。逆方向の依存はBiomeで禁止されている。

```
app/          ← Next.js App Router (ルーティングのみ。@pages/@app 経由でページを使う)
src/
├── app/      ← アプリ初期化・グローバル設定 (全レイヤーに依存可)
├── pages/    ← ページ構成 (widgets, features, entities, shared)
├── widgets/  ← 複合UIブロック (features, entities, shared)
├── features/ ← ビジネス機能 (entities, shared)
├── entities/ ← ドメインモデル (shared のみ)
└── shared/   ← 共通ユーティリティ (外部ライブラリのみ)
```

**注意: `app/` ディレクトリが2つ存在する。** ルートの `app/` は Next.js App Router（ルーティング・レイアウト定義のみ）。`src/app/` は FSD の app レイヤー（プロバイダー・グローバル設定など）。混同しないこと。

### Path Aliases

各レイヤーに `@` プレフィックスのエイリアスが設定済み（tsconfig.json で定義）: `@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`

### Slice Structure

`pages/`, `widgets/`, `features/`, `entities/` 内の各スライスは以下のセグメントで構成:

- `ui/` — UIコンポーネント
- `model/` — ステート・ビジネスロジック
- `api/` — API通信
- `lib/` — ヘルパー関数
- `config/` — 設定

各スライスのルートに `index.ts` を配置し、公開APIとしてバレルエクスポートする。バレルファイルには re-export 文のみ記述可能（ロジックやインポートは禁止）。バレルファイル内ではパスエイリアス(`@xxx`)の使用も禁止 — ローカルセグメントからの相対インポートで re-export すること。

**`shared` レイヤーは例外**: スライスを持たず、セグメント (`ui/`, `lib/`, `api/`, `config/`, `types/`) を直接配置する。`@shared/ui` のようにセグメント単位でインポートするが、`@shared/ui/Button` のようなディープインポートは不可。

### Cross-Import API (`@x/`)

entities レイヤーでは、スライス間の制御されたクロスインポートが `@x/` パターンで可能。`entities/<slice>/@x/<consumer>.ts` に re-export を配置し、`<consumer>` スライスからのみ `@entities/<slice>/@x/<consumer>` でインポートできる。

```
entities/
  song/
    @x/
      artist.ts    ← artist スライス向けに Song 型を re-export
    model/
      song.ts
    index.ts
  artist/
    model/
      artist.ts    ← @entities/song/@x/artist から Song をインポート可
    index.ts
```

`@x/` ファイルのルール:
- re-export のみ（バレルファイルと同じ制約）
- 親スライスのセグメント (`../model`, `../ui` 等) からの相対パスで re-export
- パスエイリアス (`@xxx`) の使用は禁止
- ファイル名がコンシューマースライス名と一致する必要がある

### App Router (`app/`) の依存ルール

ルートの `app/` からは `@pages` と `@app` のみインポート可能。`@widgets`, `@features`, `@entities` の直接インポートは禁止。

実際のパターン: `app/page.tsx` → `@pages/home` (ページコンポーネント)、`app/layout.tsx` → `@app/providers` (グローバルプロバイダー)

## FSD Rules (Biome + GritQL で強制)

**これらに違反するとlintエラーになる:**

1. **上位レイヤーへの依存禁止** — 例: `@entities` から `@features` をインポート不可
2. **同一レイヤー内のクロスインポート禁止** — 例: `@features/cart` から `@features/auth` をインポート不可（entities レイヤーは `@x/` クロスインポートAPIで例外あり）
3. **ディープインポート禁止** — `@features/cart/lib/utils` ではなく `@features/cart` からインポート
4. **深い相対パス禁止** — `../../` 以上の相対パスは不可。パスエイリアスを使う
5. **`export * from` 禁止** — 名前付きエクスポートを明示する
6. **循環インポート禁止**
7. **セグメント名制限** — `ui`, `model`, `api`, `lib`, `config` のみ許可
8. **レイヤー名制限** — `src/` 直下は `app`, `pages`, `widgets`, `features`, `entities`, `shared` のみ
9. **App Router (`app/`) からの直接依存制限** — `@widgets`, `@features`, `@entities` の直接インポート禁止。`@pages`/`@app` 経由で使う
10. **バレルファイルは re-export のみ** — `index.ts` にロジックやインポート文を書くとエラー
11. **FSD 境界越え相対パス禁止** — `src/` 配下でレイヤー/スライス/セグメント境界を越える `../` は禁止。パスエイリアスを使う
12. **バレルファイル内パスエイリアス禁止** — `index.ts` 内では `@xxx` エイリアスを使用不可。ローカルセグメントからの相対パスで re-export する
13. **`@x/` クロスインポートAPIのコンシューマー制限** — `@entities/<slice>/@x/<consumer>` は `<consumer>` スライスからのみインポート可能。それ以外のスライスからのインポートはエラー
14. **`@x/` ファイルは re-export のみ** — `@x/` ディレクトリ内のファイルはバレルファイルと同様、re-export 以外の記述はエラー
15. **CommonJS 構文禁止** — `require()` や `module.exports` は使用不可。ESM の `import`/`export` を使う
16. **`import = require()` 禁止** — TypeScript 固有の CommonJS 構文も使用不可
17. **レイヤー外ファイル禁止** — `src/` 直下や非標準レイヤー名のディレクトリからのパスエイリアスインポートはエラー
18. **`typeof import()` のレイヤー制約** — 型レベルの `typeof import("@xxx/...")` にも通常のインポートと同じ FSD レイヤー依存ルールが適用される
19. **テンプレートリテラル `import()` 禁止** — `` import(`${var}`) `` のような動的パス構築は禁止。静的な文字列パスを使う
20. **`@x/` は entities レイヤーのみ** — entities 以外のレイヤーで `@x/` ディレクトリを使用するとエラー
21. **自スライスの `@x/` アクセス禁止** — 自スライスの `@x/` ファイルにアクセスするのは不要な間接参照。ローカルセグメントから直接インポートする
22. **ファイル名 kebab-case 強制** — ファイル名は kebab-case のみ許可（camelCase, PascalCase, snake_case は不可）
23. **default export 禁止** — `export default` は禁止。named export を使う。例外: App Router の特別ファイル (`page.tsx`, `layout.tsx` 等)、root 設定ファイル (`*.config.*`)、`proxy.ts`

Lint ルールの実体は `biome.jsonc`（Biome 組み込みルール + overrides）と `biome/` ディレクトリ内の GritQL プラグイン（カスタムルール）。
