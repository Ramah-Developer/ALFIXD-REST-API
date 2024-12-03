const axios = require('axios');
const express = require('express');

module.exports = function (app) {
  async function tiktokDl(url) {
    try {
      // Membuat URL API Tikwm dengan parameter dinamis
      const apiUrl = `https://www.tikwm.com/api?url=${encodeURIComponent(url)}`;

      const response = await axios.get(apiUrl);

      if (response.data && response.data.data) {
        return response.data.data; // Hanya data video yang diambil
      } else {
        throw new Error("Invalid response from Tikwm API.");
      }
    } catch (error) {
      console.error("Error fetching TikTok data:", error.message);
      throw new Error("Failed to fetch TikTok video data.");
    }
  }

  // Endpoint untuk download video TikTok
  app.get('/tiktok', async (req, res) => {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL TikTok is required.",
      });
    }

    try {
      const data = await tiktokDl(url);

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
};
