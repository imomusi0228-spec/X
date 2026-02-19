require('dotenv').config();

module.exports = {
  twitterConfig: {
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
  },
  // Array of messages to rotate through
  tweetMessages: [
    // General Promotion
    "Disordサーバー運営に革命を。\n高機能管理Bot「Akatsuki」で、あなたのサーバーを次のレベルへ。\nhttps://akatsuki-bot-production.up.railway.app #DiscordBot #Discord",

    // Free Tier Promotion
    "【無料プランでも強力】\nVC入退室ログの自動記録、NGワード検知、アンチレイド保護。\nこれら全てが無料で使えるDiscord Bot、試してみませんか？\nhttps://akatsuki-bot-production.up.railway.app/login #DiscordBot",

    // Pro Tier Promotion
    "【Proプランでより安全に】\nIron Fortressによるレイド自動救済、高度な不審リンクフィルタリング。\n月額プランでサーバーのセキュリティを強化しましょう。\nhttps://imomusi0213.booth.pm/items/7935721 #DiscordBot",

    // Pro+ Tier Promotion
    "【Pro+プラン: 完全なる管理】\n違反ユーザーの即座隔離、AIによるサーバー戦略レポート。\n大規模サーバー運営者のための究極のツールセット。\nhttps://imomusi0213.booth.pm/items/7935721 #DiscordBot",

    // Web Dashboard
    "Webダッシュボードからサーバーを簡単に管理。\n複雑なコマンド操作はもう不要です。\nhttps://akatsuki-bot-production.up.railway.app/features #DiscordBot",

    // Limited Campaign
    "【先着10サーバー限定】\nプレミアム機能を無料でお試しできるキャンペーン実施中！\n今すぐ導入して、最強のサーバー管理を体験してください。\n早い者勝ちです！\nhttps://akatsuki-bot-production.up.railway.app #DiscordBot #無料キャンペーン"
  ],
  // Fallback message
  defaultMessage: "Check out the Akatsuki Discord Bot! https://akatsuki-bot-production.up.railway.app #DiscordBot",

  // Default schedule: Every 4 hours
  cronSchedule: process.env.CRON_SCHEDULE || "0 */4 * * *"
};
