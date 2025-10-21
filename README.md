# Markdown Previewer

リアルタイムマークダウンプレビューア with 校正機能

## 概要

「書く、見る、整える。」をコンセプトにした、シンプルなマークダウンエディタです。
ユーザーがマークダウン記法で書いたテキストを、リアルタイムでプレビュー・校正できるウェブアプリケーションです。

## 機能

- リアルタイムマークダウンプレビュー
- 日本語校正機能（textlint使用）
- レスポンシブデザイン
- XSS対策済み

## 技術スタック

- React 18
- Vite
- marked.js（マークダウンパーサー）
- textlint（校正エンジン）
- DOMPurify（XSS対策）

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## ディレクトリ構造

```
src/
├── components/          # Reactコンポーネント
│   ├── Editor.jsx      # マークダウン入力エリア
│   ├── Preview.jsx     # プレビュー表示エリア
│   ├── Header.jsx      # ヘッダー（ボタン類）
│   └── Layout.jsx      # レイアウト管理
├── hooks/              # カスタムフック
│   ├── useMarkdown.js  # マークダウン処理
│   └── useTextlint.js  # 校正処理
├── utils/              # ユーティリティ関数
│   ├── markdown.js     # マークダウン関連
│   ├── textlint.js     # 校正関連
│   └── sanitize.js     # HTMLサニタイズ
├── styles/             # CSSファイル
│   ├── globals.css     # グローバルスタイル
│   └── components.css  # コンポーネントスタイル
├── data/               # データファイル
│   └── sample.md       # サンプルテキスト
└── App.jsx             # メインアプリケーション
```
