const axios = require('axios');
const express = require('express');

module.exports = function (app) {
  // Fungsi untuk download video TikTok
  async function tiktokDl(url) {
    try {
      const response = await axios.post(
        "https://www.tikwm.com/api",
        {},
        {
          params: {
            url: url,
            count: 12,
            cursor: 0,
            web: 1,
            hd: 1,
          },
        }
      );

      // Mengembalikan data dari API
      return response.data;
    } catch (error) {
      console.error("Error fetching TikTok data:", error.message);
      throw new Error("Failed to fetch TikTok video data.");
    }
  }

  // Rute untuk TikTok downloader
  app.get('/tiktok', async (req, res) => {
    const { url } = req.query; // Mendapatkan URL dari query parameter

    // Validasi input
    if (!url) {
      return res.status(400).json({ error: "URL is required." });
    }

    try {
      // Memanggil fungsi tiktokDl untuk mendapatkan data
      const results = await tiktokDl(url);

      // Mengembalikan hasil ke klien
      return res.status(200).json(results);
    } catch (error) {
      // Penanganan kesalahan
      return res.status(500).json({ error: error.message });
    }
  });
};
