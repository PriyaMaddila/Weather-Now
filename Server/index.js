import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.OPENWEATHER_API_KEY;
if (!API_KEY) {
  console.warn("Warning: OPENWEATHER_API_KEY not set in environment variables.");
}

// Basic proxy endpoint
app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: "Missing 'city' query parameter." });

    // Use OpenWeatherMap Current Weather API (metric)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${API_KEY}`;

    const resp = await fetch(url);
    if (!resp.ok) {
      const text = await resp.text();
      return res.status(resp.status).json({ error: text || "Failed fetching weather" });
    }

    const data = await resp.json();
    // shape response to only what's needed
    const shaped = {
      city: data.name,
      country: data.sys?.country,
      coord: data.coord,
      weather: {
        main: data.weather?.[0]?.main,
        description: data.weather?.[0]?.description,
        icon: data.weather?.[0]?.icon
      },
      main: {
        temp: data.main?.temp,
        feels_like: data.main?.feels_like,
        humidity: data.main?.humidity,
        pressure: data.main?.pressure
      },
      wind: data.wind
    };
    res.json(shaped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Weather Now server running on port ${PORT}`);
});
