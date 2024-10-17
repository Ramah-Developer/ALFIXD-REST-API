const axios = require('axios');

module.exports = function(app) {

async function tiktok2(message) {
  try {
    const encodedParams = new URLSearchParams();
    encodedParams.set('url', message);
    encodedParams.set('hd', '1');

    const response = await axios({
      method: 'POST',
      url: 'https://tikwm.com/api/',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'current_language=en',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
      },
      data: encodedParams
    });

    const videos = response.data.data;
    return {
      no_watermark: videos.play,
      watermark: videos.wmplay,
      music: videos.music
    };

  } catch (error) {
    throw new Error(`Failed to fetch video: ${error.message}`);
  }
}

app.get('/tiktok', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Parameter "url" tidak ditemukan' });
    }

    const response = await tiktok2(url);
    res.status(200).json({
      status: 200,
      creator: "ALFIXD",
      data: response
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
