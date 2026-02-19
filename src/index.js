const cron = require('node-cron');
const rwClient = require('./twitterClient');
const config = require('../config');
const http = require('http');

// Render requires a port to be bound
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Twitter Promo Bot is running');
}).listen(port, () => console.log(`Server is running on port ${port}`));

console.log('--- Twitter Promotion Bot Started ---');
console.log(`Target Schedule: ${config.cronSchedule}`);
console.log(`Loaded Messages: ${config.tweetMessages ? config.tweetMessages.length : 1}`);

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

// Optional: Run once on startup to verify (uncomment if needed)
// tweet();
