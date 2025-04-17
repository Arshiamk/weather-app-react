import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (err) {
      console.error(err);
      setError("Could not fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-xl mt-10">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
      <input
        className="border px-2 py-1 rounded w-full mb-4"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={fetchWeather}
      >
        Get Weather
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div className="text-left">
          <p className="text-xl font-semibold">{weather.location.name}, {weather.location.country}</p>
          <p>{weather.current.condition.text}</p>
          <p>🌡️ {weather.current.temp_c} °C</p>
          <p>💨 Wind: {weather.current.wind_kph} kph</p>
          <img src={weather.current.condition.icon} alt="icon" />
        </div>
      )}
    </div>
  );
}
