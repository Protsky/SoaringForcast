const express = require("express");
const axios = require("axios");

const app = express();

const apiKey = "AIzaSyAL-yacOreZug0zLTp3Rt85rXRMzSSQkcQ";

app.get("/elevation", async (req, res) => {
  const { lat, lng } = req.query;
  const url = `https://maps.googleapis.com/maps/api/elevation/json?locations=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
