# Xserver デプロイ設定ガイド

## 📋 前提条件

1. **Xserverアカウント** - レンタルサーバー契約済み
2. **SSH接続設定** - XserverでSSH接続が有効
3. **GitHub Secrets設定** - 必要な認証情報を設定済み

## 🔧 GitHub Secrets の設定

GitHubリポジトリの「Settings」→「Secrets and variables」→「Actions」で以下のSecretsを設定してください：

| Secret名 | 説明 | 例 |
|---------|------|-----|
| `SSH_HOST` | Xserverのホスト名 | `i-iide.com` |
| `SSH_USERNAME` | SSH接続用ユーザー名 | `raytree` |
| `SSH_PRIVATE_KEY` | SSH秘密鍵 | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `SSH_PORT` | SSH接続ポート | `22` |

## 📁 Xserver側のディレクトリ構成

```
/home/[ユーザー名]/i-iide.com/public_html/apps/markdown-previewer/
├── index.html          # ビルド済みファイル
├── assets/             # 静的アセット
│   ├── index-[hash].js
│   └── index-[hash].css
└── .git/               # Gitリポジトリ
```

## 🚀 デプロイフロー

### 1. 自動デプロイ（推奨）
- `main`ブランチにプッシュすると自動的にデプロイが実行されます
- GitHub Actionsが以下の処理を実行：
  1. コードのチェックアウト
  2. Node.js環境のセットアップ
  3. 依存関係のインストール
  4. プロジェクトのビルド
  5. XserverへのSSH接続
  6. サーバー側でのGit更新
  7. ビルドとデプロイ
  8. ヘルスチェック

### 2. 手動デプロイ
- GitHub Actionsの「Actions」タブから手動実行も可能
- `workflow_dispatch`イベントで実行

## 🔍 デプロイ確認

デプロイが成功すると、以下のURLでアプリケーションにアクセスできます：
- **本番URL:** `https://i-iide.com/apps/markdown-previewer/`

## ⚠️ 注意事項

1. **SSH鍵の管理**
   - 秘密鍵はGitHub Secretsに安全に保存
   - 公開鍵はXserverのSSH設定に追加

2. **権限設定**
   - デプロイ後、ファイル権限が755に設定されます
   - 必要に応じて権限を調整してください

3. **ビルドサイズ**
   - デプロイログでビルドサイズが表示されます
   - サイズが大きい場合は最適化を検討

4. **ヘルスチェック**
   - デプロイ後に自動的にヘルスチェックが実行されます
   - チェックが失敗した場合はデプロイが失敗扱いになります

## 🛠️ トラブルシューティング

### SSH接続エラー
```bash
# SSH接続テスト
ssh -p 22 [ユーザー名]@i-iide.com
```

### 権限エラー
```bash
# ファイル権限の確認・修正
ls -la /home/[ユーザー名]/i-iide.com/public_html/apps/markdown-previewer/
chmod -R 755 /home/[ユーザー名]/i-iide.com/public_html/apps/markdown-previewer/
```

### ビルドエラー
- GitHub Actionsのログを確認
- ローカルでビルドテストを実行
- 依存関係のバージョンを確認

## 📊 デプロイログの確認

GitHub Actionsの「Actions」タブでデプロイログを確認できます：
- ✅ 成功時：緑色のチェックマーク
- ❌ 失敗時：赤色のXマーク
- 📋 ログ：各ステップの詳細ログを確認可能
