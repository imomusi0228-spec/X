const cron = require('node-cron');
const rwClient = require('./twitterClient');
const config = require('../config');
const http = require('http');
const https = require('https');

// Render requires a port to be bound
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Twitter Promo Bot is running');
}).listen(port, () => console.log(`Server is running on port ${port}`));

console.log('--- Twitter Promotion Bot Started ---');
console.log(`Target Schedule: ${config.cronSchedule}`);
console.log(`Loaded Messages: ${config.tweetMessages ? config.tweetMessages.length : 1}`);

// Keep-Alive Ping for Render Free Tier
// Pings the external URL every 14 minutes to prevent sleeping
let RENDER_EXTERNAL_URL = process.env.RENDER_EXTERNAL_URL;

if (RENDER_EXTERNAL_URL) {
    // Add protocol if missing
    if (!RENDER_EXTERNAL_URL.startsWith('http://') && !RENDER_EXTERNAL_URL.startsWith('https://')) {
        RENDER_EXTERNAL_URL = 'https://' + RENDER_EXTERNAL_URL;
        console.log(`Keep-Alive: No protocol detected, normalized to ${RENDER_EXTERNAL_URL}`);
    }

    console.log(`Keep-Alive: Configured for ${RENDER_EXTERNAL_URL}`);
    
    const ping = () => {
        const pingLib = RENDER_EXTERNAL_URL.startsWith('https') ? https : http;
        pingLib.get(RENDER_EXTERNAL_URL, (res) => {
            console.log(`[${new Date().toISOString()}] Keep-Alive Ping: status code ${res.statusCode}`);
        }).on('error', (e) => {
            console.error(`[${new Date().toISOString()}] Keep-Alive Ping Error: ${e.message}`);
        });
    };

    // Run every 14 minutes
    setInterval(ping, 14 * 60 * 1000);
    
    // Also run once shortly after startup
    setTimeout(ping, 30 * 1000); 
} else {
    console.warn('--- WARNING ---');
    console.warn('RENDER_EXTERNAL_URL is not set. The bot will likely SLEEP on Render Free Tier.');
    console.warn('Please set RENDER_EXTERNAL_URL in your environment variables.');
    console.warn('---------------');
}

const tweet = async () => {
    try {
        console.log(`[${new Date().toISOString()}] Sending tweet...`);

        // Check if credentials are set
        if (!config.twitterConfig.appKey || !config.twitterConfig.appSecret) {
            console.error('Error: Twitter API keys are missing in .env file.');
            return;
        }

        // Select a random message
        const messages = config.tweetMessages || [config.defaultMessage];
        const message = messages[Math.floor(Math.random() * messages.length)];

        console.log(`Payload: ${message}`);

        const { data: createdTweet } = await rwClient.v2.tweet(message);
        console.log('Tweet sent successfully!');
        console.log('ID:', createdTweet.id);
        console.log('Text:', createdTweet.text);

    } catch (e) {
        console.error('Failed to send tweet:', e);
    }
};

// Schedule the task
cron.schedule(config.cronSchedule, () => {
    tweet();
});

// Run once on startup to verify
tweet();
