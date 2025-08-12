const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const apiKey = process.env.UPSTOX_API_KEY;
  const accessToken = process.env.UPSTOX_ACCESS_TOKEN;

  // Use accessToken in API headers for authentication
  const response = await fetch('https://api.upstox.com/market-data-endpoint', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'x-api-key': apiKey,
    },
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

