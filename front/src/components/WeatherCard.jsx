function WeatherCard({ data }) {
    const { name, weather, main } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  
    return (
      <div style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        marginTop: "20px",
        textAlign: "center",
        backgroundColor: "#f3f3f3"
      }}>
        <h2>{name}</h2>
        <img src={iconUrl} alt={weather[0].description} />
        <p style={{ fontSize: "20px" }}>{weather[0].description}</p>
        <p style={{ fontSize: "28px", fontWeight: "bold" }}>{main.temp}°C</p>
      </div>
    );
  }
  
  export default WeatherCard;