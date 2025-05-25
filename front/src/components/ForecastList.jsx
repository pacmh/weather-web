function ForecastList({ data }) {
    // 하루에 한 번만 예보 보여주기 위해 날짜별로 필터링
    const dailyForecasts = [];
    const usedDates = new Set();
  
    data.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!usedDates.has(date)) {
        dailyForecasts.push(item);
        usedDates.add(date);
      }
    });
  
    return (
      <div style={{ marginTop: "30px" }}>
        <h3>📅 5일간 예보</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {dailyForecasts.map((item, index) => {
            const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
            return (
              <div key={index} style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <span>{item.dt_txt.split(" ")[0]}</span>
                <img src={iconUrl} alt={item.weather[0].description} width={40} />
                <span>{item.weather[0].description}</span>
                <span>{item.main.temp}°C</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  export default ForecastList;