const redis = require('redis');

const client = redis.createClient();

client.on('connect', function () {
    console.log('connected');
})

client.on('error', function () {
    console.log('error socket');
})

console.time('here');

module.exports = client;
