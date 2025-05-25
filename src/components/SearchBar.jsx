import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { fetchCitySuggestions } from "../utils/api";
import CitySuggest from "./CitySuggest";

import axios from "axios";

const SearchBar = ({ city, setCity, setWeatherData, setForecastData, setError }) => {
  const [loading, setLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

  const [suggestions, setSuggestions] = useState([]);
  const debouncedCity = useDebounce(city, 500);

  useEffect(() => {
    const getSuggestions = async () => {
      if (debouncedCity.length < 2) {
        setSuggestions([]);
        return;
      }

      const results = await fetchCitySuggestions(debouncedCity, "KR");
      setSuggestions(results);
    };

    getSuggestions();
  }, [debouncedCity]);

  const handleSearch = async (targetCity = city) => {
    if (!targetCity) {
      setError("도시 이름을 입력해주세요.");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);
    setForecastData([]);

    try {
      // 현재 날씨 정보 요청
      const current = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: `${targetCity},KR`,
          appid: API_KEY,
          units: "metric",
          lang: "kr",
        },
      });

      // 5일 예보 정보 요청
      const forecast = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
        params: {
          q: `${targetCity},KR`,
          appid: API_KEY,
          units: "metric",
          lang: "kr",
        },
      });

      setWeatherData(current.data);
      setForecastData(forecast.data.list);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("도시를 찾을 수 없습니다.");
      } else {
        setError("날씨 정보를 불러오는 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSuggestionClick = ({ city, region, country, countryCode }) => {
    const queryCity = city || region;
    if (!queryCity) {
      setError("선택된 도시 정보가 부족합니다.");
      return;
    }
    const formattedCity = `${queryCity}, ${countryCode || country || "KR"}`;
    setCity(queryCity);
    setSuggestions([]);
    handleSearch(formattedCity);
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        placeholder="대한민국 도시 이름을 입력하세요"
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ padding: "10px", width: "70%" }}
      />
      <button onClick={handleSearch} style={{ padding: "10px" }}>
        검색
      </button>
      {loading && <p>로딩 중...</p>}
      <CitySuggest suggestions={suggestions} onSelect={handleSuggestionClick} />
    </div>
  );
};

export default SearchBar;