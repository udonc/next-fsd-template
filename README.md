# next-fsd-template

Next.js 16 + [Feature-Sliced Design](https://feature-sliced.design) アーキテクチャのテンプレート。

## 技術スタック

| カテゴリ | 技術 |
| --- | --- |
| フレームワーク | Next.js 16 (App Router) |
| UI ライブラリ | React 19 |
| 言語 | TypeScript 5 |
| アーキテクチャ | Feature-Sliced Design (FSD) |
| スタイリング | Tailwind CSS v4 |
| リンター / フォーマッター | Biome |
| パッケージマネージャー | pnpm |

## セットアップ

```bash
pnpm create next-app -e https://github.com/udonc/next-fsd-template my-app
cd my-app
pnpm install
pnpm dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開いて確認。

## コマンド一覧

| コマンド | 説明 |
| --- | --- |
| `pnpm dev` | 開発サーバー起動 |
| `pnpm build` | プロダクションビルド |
| `pnpm start` | プロダクションサーバー起動 |
| `pnpm lint` | Biome lint (`biome check`) |
| `pnpm format` | Biome format (`biome format --write`) |

## アーキテクチャ

[Feature-Sliced Design (FSD)](https://feature-sliced.design) は、フロントエンドコードを技術的役割ではなくビジネスドメインで整理するアーキテクチャ手法。

### レイヤー階層

依存は**上から下方向のみ**許可。上位レイヤーへのインポートは lint で禁止されている。

```
app         ← アプリ初期化・グローバル設定
pages       ← ページ構成
widgets     ← 複合UIブロック
features    ← ビジネス機能
entities    ← ドメインモデル
shared      ← 共通ユーティリティ（ビジネスロジックなし）
```

| レイヤー | 依存可能な対象 | 説明 |
| --- | --- | --- |
| `app` | 下位すべて | プロバイダー、グローバルスタイル、メタデータ |
| `pages` | widgets, features, entities, shared | ページレベルの構成 |
| `widgets` | features, entities, shared | 複合UIブロック |
| `features` | entities, shared | ユーザー向けビジネス機能 |
| `entities` | shared | ドメインモデル・データ |
| `shared` | 外部ライブラリのみ | ビジネスロジックを含まない共通ユーティリティ |

### パスエイリアス

各レイヤーに `@` プレフィックスのエイリアスが `tsconfig.json` で定義済み:

`@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`

```ts
import { HomePageView } from "@pages/home";
import { Badge } from "@shared/ui/badge";
```

### `app/` ディレクトリが 2 つある件

> **注意:** このプロジェクトには目的の異なる 2 つの `app/` ディレクトリがある。

| ディレクトリ | 用途 |
| --- | --- |
| `app/` (ルート) | Next.js App Router — ルーティングとレイアウトのみ |
| `src/app/` | FSD app レイヤー — プロバイダー、グローバル設定、スタイル |

ルートの `app/` からは `@pages` と `@app` のみインポート可能。`@widgets`, `@features`, `@entities` の直接インポートは禁止。

## ディレクトリ構成

```
.
├── app/                        # Next.js App Router（ルーティングのみ）
│   ├── layout.tsx
│   └── page.tsx
├── src/
│   ├── app/                    # FSD: app レイヤー
│   │   ├── providers/
│   │   ├── styles/
│   │   └── metadata.ts
│   ├── pages/                  # FSD: pages レイヤー
│   │   └── home/               # ← スライス
│   │       ├── ui/             #   UI コンポーネント
│   │       ├── model/          #   ステート・ロジック
│   │       └── index.ts        #   公開API（バレルファイル）
│   ├── widgets/                # FSD: widgets レイヤー
│   │   ├── header/
│   │   └── footer/
│   ├── features/               # FSD: features レイヤー
│   ├── entities/               # FSD: entities レイヤー
│   └── shared/                 # FSD: shared レイヤー（スライスなし）
│       ├── ui/                 #   UI モジュール (badge/, external-link/, ...)
│       ├── lib/                #   ヘルパー関数
│       ├── api/                #   API ユーティリティ
│       ├── config/             #   設定
│       └── types/              #   共通型定義
├── biome/                      # FSD 用カスタム GritQL lint ルール
├── pages/                      # ダミーディレクトリ（削除禁止）
├── biome.jsonc
└── tsconfig.json
```

### スライス構成

`pages/`, `widgets/`, `features/`, `entities/` 内の各スライスは以下のセグメントで構成される:

```
<slice>/
├── ui/          # UI コンポーネント
├── model/       # ステート・ビジネスロジック
├── api/         # API 通信
├── lib/         # ヘルパー関数
├── config/      # 設定
└── index.ts     # 公開API（バレルファイル、re-export のみ）
```

### `shared` レイヤー

`shared` レイヤーは**スライスを持たない**。セグメントを直接配置し、各セグメント内にモジュールディレクトリを作成する:

```ts
// ✅ モジュール単位のインポート
import { Badge } from "@shared/ui/badge";

// ❌ セグメント単位のインポート（禁止）
import { Badge } from "@shared/ui";

// ❌ モジュール内部へのディープインポート（禁止）
import { Badge } from "@shared/ui/badge/badge";
```

## FSD Lint ルール

FSD の規約は Biome（組み込みルール + `biome/` 内のカスタム GritQL プラグイン）で強制される。`pnpm lint` で確認可能。

### 主要ルール

| ルール | 説明 |
| --- | --- |
| レイヤー依存の方向制限 | 下位レイヤーから上位レイヤーへのインポート禁止 |
| クロスインポート禁止 | 同一レイヤー内のスライス間インポート禁止 |
| ディープインポート禁止 | バレルファイル（`index.ts`）経由でインポートすること |
| `shared` モジュール単位インポート | `@shared/ui/badge` のようにモジュール単位で指定 |
| kebab-case ファイル名 | すべてのファイル名は kebab-case |
| default export 禁止 | named export を使用（App Router 特殊ファイルは例外） |
| バレルファイルは re-export のみ | `index.ts` にロジックやインポート文は記述不可 |

### 高度な機能

- **`@x/` クロスインポート API** — `entities` レイヤー内のスライス間で制御されたクロスインポートが可能。詳細は `CLAUDE.md` を参照。
- **サーバー/クライアント専用バレル** — `index.server.ts` / `index.client.ts` でサーバー専用・クライアント専用エクスポートを分離。

## 注意事項

- **ルートの `pages/` ディレクトリを削除しないこと。** Next.js が `src/pages/` を Pages Router と誤認するのを防ぐためのダミーディレクトリ。詳細は [`pages/README.md`](pages/README.md) を参照。
- **テストフレームワークは未導入。** 必要に応じて好みのテストツールを追加すること。

## ライセンス

MIT
