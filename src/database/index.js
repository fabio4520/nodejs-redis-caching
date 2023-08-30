const redis = require('redis');

// Crear cliente Redis
const client = redis.createClient({
  port: 6379,
  host: 'localhost',
  legacyMode: true,
});


(async () => {
  await client.connect();
})();

client.on('connect', () => console.log('Redis Client Connected'));
client.on('error', (err) => console.log('Redis Client Connection Error', err));


module.exports = client;