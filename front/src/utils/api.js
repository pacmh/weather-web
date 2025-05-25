import axios from "axios";

const geoApiOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
};

export const fetchCitySuggestions = async (keyword) => {
  if (!keyword) return [];

  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${keyword}&limit=5&countryIds=KR`;

  try {
    const response = await axios.get(url, geoApiOptions);
    const filtered = response.data.data
      .filter(item => item.city) // 필수: city 값이 있어야 함
      .map(item => ({
        city: item.city,
        region: item.region,
        country: item.country
      }));
    return filtered;
  } catch (err) {
    console.error("도시 추천 API 오류:", err);
    return [];
  }
};