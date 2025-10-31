import React from "react";

export default function WeatherCard({ data }) {
  const { city, country, weather, main, wind } = data;
  const iconUrl = weather?.icon ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png` : "";

  return (
    <div className="card">
      <div className="card-header">
        <h2>{city}{country ? `, ${country}` : ""}</h2>
        <div className="weather-main">
          {iconUrl && <img src={iconUrl} alt={weather.description} />}
          <div>
            <div className="temp">{Math.round(main.temp)}°C</div>
            <div className="desc">{weather.description}</div>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="stat">
          <div className="label">Feels like</div>
          <div className="value">{Math.round(main.feels_like)}°C</div>
        </div>
        <div className="stat">
          <div className="label">Humidity</div>
          <div className="value">{main.humidity}%</div>
        </div>
        <div className="stat">
          <div className="label">Wind</div>
          <div className="value">{wind?.speed ?? "-"} m/s</div>
        </div>
        <div className="stat">
          <div className="label">Pressure</div>
          <div className="value">{main.pressure} hPa</div>
        </div>
      </div>
    </div>
  );
}
