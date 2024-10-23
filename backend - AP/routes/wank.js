import express from "express";
import axios from "axios";

const wank = express.Router();

wank.get("/replays", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "polaris_id is required" });
  }

  try {
    const response = await axios.get(
      `https://wank.wavu.wiki/player/${id}/replays?_format=json`
    );
    let data = response.data;

    console.log("Received data count: ", data.length);

    res.json(data);
  } catch (error) {
    console.error("Error fetching data: ", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

export default wank;
