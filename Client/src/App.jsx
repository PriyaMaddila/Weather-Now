import { useState } from "react";

const API_KEY = "ac58d7952377ef001e75109644522bb9"; // 🔑 Replace this with your OpenWeatherMap API key

export default function App() {
  const [city, setCity] = useState("Mumbai");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      setError(null);
      setWeather(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError("Error fetching weather data");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-4xl font-bold mb-6">🌦️ Weather Now</h1>

      <div className="bg-white/20 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-grow p-2 rounded-l-lg text-black"
          />
          <button
            onClick={fetchWeather}
            className="bg-yellow-400 text-black px-4 rounded-r-lg font-semibold hover:bg-yellow-300 transition"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-200 text-center">{error}</p>}

        {weather && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{weather.name}</h2>
            <p className="text-lg">{weather.weather[0].description}</p>
            <p className="text-5xl font-bold my-2">
              {Math.round(weather.main.temp)}°C
            </p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>

      <p className="mt-8 opacity-80 text-sm">
        Built with ❤️ using React + Tailwind
      </p>
    </div>
  );
}
