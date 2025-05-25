
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState("");

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>날씨 웹🌤️</h1>
      <SearchBar
        city={city}
        setCity={setCity}
        setWeatherData={setWeatherData}
        setForecastData={setForecastData}
        setError={setError}
      />
      {error && <ErrorMessage message={error} />}
      {weatherData && <WeatherCard data={weatherData} />}
      {forecastData.length > 0 && <ForecastList data={forecastData} />}
    </div>
  );
}

export default App;