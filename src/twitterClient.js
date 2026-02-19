const { TwitterApi } = require('twitter-api-v2');
const config = require('../config');

// Initialize client with credentials from config
const client = new TwitterApi({
    appKey: config.twitterConfig.appKey,
    appSecret: config.twitterConfig.appSecret,
    accessToken: config.twitterConfig.accessToken,
    accessSecret: config.twitterConfig.accessSecret,
});

// Provide the read-write client
const rwClient = client.readWrite;

module.exports = rwClient;
