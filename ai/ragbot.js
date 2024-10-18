const axios = require('axios');

module.exports = function(app) {


async function ragbot(message) {
  try {
    const response = await axios.post('https://ragbot-starter.vercel.app/api/chat', {
      messages: [{ role: 'user', content: message }],
      useRag: true,
      llm: 'gpt-3.5-turbo',
      similarityMetric: 'cosine'
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Endpoint untuk ragbot
app.get('/ragbot', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await ragbot(message);
    res.status(200).json({
      status: 200,
      creator: "ALFIXD",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});