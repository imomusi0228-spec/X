# Discord Bot Promo Twitter

Discord Bot「Akatsuki」をTwitterで宣伝するための自動投稿ボットです。

## セットアップ

1. **Twitter API 認証情報の取得**:
   [Twitter Developer Portal](https://developer.twitter.com/) でプロジェクトを作成し、以下の情報を取得してください。
   - API Key (`APP_KEY`)
   - API Key Secret (`APP_SECRET`)
   - Access Token (`ACCESS_TOKEN`)
   - Access Token Secret (`ACCESS_SECRET`)
   ※ `Read and Write` 権限が必要です。

2. **環境変数の設定**:
   `.env.example` を参考に、Renderのダッシュボード（またはローカルの `.env` ファイル）に以下の環境変数を設定してください。

   - `APP_KEY`
   - `APP_SECRET`
   - `ACCESS_TOKEN`
   - `ACCESS_SECRET`
   - `CRON_SCHEDULE`: 投稿スケジュール（例: `0 */4 * * *` で4時間おき）
   - `RENDER_EXTERNAL_URL`: **[重要]** サービス起動維持のために必要です。Renderから割り当てられるURL（例: `https://xxxx.onrender.com`）を設定してください。

## Render へのデプロイ

1. GitHub リポジトリを Render の Web Service として接続します。
2. Build Command: `npm install`
3. Start Command: `node src/index.js`
4. 環境変数を `Environment` セクションで設定します。

## スリープの防止について

Renderの無料プランは15分間アクセスがないと自動的にスリープします。このボットは `RENDER_EXTERNAL_URL` が設定されている場合、14分おきに自分自身へアクセス（Ping）を行うことで、スリープを防止しようとします。
