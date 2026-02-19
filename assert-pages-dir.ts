// ルートの pages/ はダミーディレクトリ（詳細は pages/README.md）。
// ビルド対象ファイルが紛れ込んでいないかチェックする。

import fs from "node:fs";
import path from "node:path";

const pagesDir = path.join(import.meta.dirname, "pages");

if (!fs.existsSync(pagesDir)) {
  throw new Error(
    "pages/ ディレクトリが存在しません。削除しないでください。\n詳細は pages/README.md を参照。",
  );
}

const invalid = fs.readdirSync(pagesDir).filter((f) => !f.endsWith(".md"));
if (invalid.length > 0) {
  throw new Error(
    `pages/ はダミーディレクトリです。ビルド対象のファイルを置かないでください: ${invalid.join(", ")}\n詳細は pages/README.md を参照。`,
  );
}
