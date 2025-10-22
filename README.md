# Markdown Previewer

リアルタイムマークダウンプレビューア with 校正機能

## 概要

「書く、見る、整える。」をコンセプトにした、シンプルなマークダウンエディタです。
ユーザーがマークダウン記法で書いたテキストを、リアルタイムでプレビュー・校正できるウェブアプリケーションです。

## 🌟 機能

- ✅ リアルタイムマークダウンプレビュー
- ✅ 日本語校正機能（カスタムルール）
- ✅ レスポンシブデザイン（PC/モバイル対応）
- ✅ XSS対策済み
- ✅ サンプルテキスト読み込み
- ✅ テキストクリア機能
- ✅ 統計情報表示

## 🛠️ 技術スタック

- **フロントエンド:** React 18 + Vite
- **マークダウンパーサー:** marked.js
- **XSS対策:** DOMPurify
- **校正機能:** カスタム実装（簡易版）
- **デプロイ:** GitHub Actions + Xserver

## 🚀 セットアップ

### ローカル開発環境

```bash
# リポジトリのクローン
git clone https://github.com/su-learning-labo/markdown-previewer.git
cd markdown-previewer

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

### 🌐 本番環境

- **URL:** https://i-iide.com/apps/markdown-previewer/
- **自動デプロイ:** `main`ブランチへのプッシュで自動デプロイ
- **詳細設定:** [DEPLOYMENT.md](./DEPLOYMENT.md) を参照

## 📁 ディレクトリ構造

```
markdown-previewer/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions デプロイ設定
├── src/
│   ├── components/             # Reactコンポーネント
│   │   ├── Editor.jsx         # マークダウン入力エリア
│   │   ├── Preview.jsx        # プレビュー表示エリア
│   │   ├── Header.jsx         # ヘッダー（ボタン類）
│   │   └── Layout.jsx         # レイアウト管理
│   ├── hooks/                  # カスタムフック
│   │   ├── useMarkdown.js     # マークダウン処理
│   │   └── useTextlint.js     # 校正処理
│   ├── utils/                  # ユーティリティ関数
│   │   ├── markdown.js        # マークダウン関連
│   │   ├── textlint.js        # 校正関連
│   │   └── sanitize.js        # HTMLサニタイズ
│   ├── styles/                 # CSSファイル
│   │   ├── globals.css        # グローバルスタイル
│   │   └── components.css     # コンポーネントスタイル
│   ├── data/                   # データファイル
│   │   └── sample.md          # サンプルテキスト
│   ├── App.jsx                 # メインアプリケーション
│   └── main.jsx                # エントリーポイント
├── package.json                # 依存関係
├── vite.config.js              # Vite設定
├── DEPLOYMENT.md               # デプロイ設定ガイド
└── README.md                   # プロジェクト説明
```

## 🔄 CI/CD フロー

1. **コードプッシュ** → `main`ブランチにプッシュ
2. **自動ビルド** → GitHub Actionsがビルド実行
3. **自動デプロイ** → XserverにSSH接続してデプロイ
4. **ヘルスチェック** → デプロイ後の動作確認
5. **完了通知** → デプロイ成功/失敗の通知

## 📝 校正機能について

現在は簡易的な校正機能を実装しています：

- **冗長な表現の検出** - 「することができます」→「できます」
- **文体の混在チェック** - 「です・ます調」と「だ・である調」の混在
- **誤字脱字の検出** - よくある誤字の自動検出

詳細は [校正機能の実装](./src/utils/textlint.js) を参照してください。

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。
