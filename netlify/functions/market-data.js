const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const apiKey = process.env.UPSTOX_API_KEY;          // From Netlify env
    const accessToken = process.env.UPSTOX_ACCESS_TOKEN; // From Netlify env

    // Example: Reliance Industries instrument key
    // Get from Upstox master instruments list for your symbols
    const instrumentKey = "NSE_EQ|INE002A01018"; // Replace with desired stock

    const url = `https://api.upstox.com/v2/market/quotes?instrument_key=${instrumentKey}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "x-api-key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Upstox API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (error) {
    console.error("Error fetching market data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};



