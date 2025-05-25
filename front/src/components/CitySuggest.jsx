function CitySuggest({ suggestions, onSelect }) {
    if (!suggestions || suggestions.length === 0) return null;
  
    return (
      <ul style={{
        marginTop: "10px",
        padding: 0,
        listStyle: "none",
        border: "1px solid #ccc",
        borderRadius: "5px",
        maxHeight: "150px",
        overflowY: "auto",
        backgroundColor: "#fff"
      }}>
        {suggestions.map((location, index) => {
          const city = location.city;
          const region = location.region;
          const country = location.country;

          const displayName = city || region;
          if (!displayName) return null;

          const uniqueParts = [];
          if (city) uniqueParts.push(city);
          if (region && region !== city) uniqueParts.push(region);
          if (country) uniqueParts.push(country);

          const name = uniqueParts.join(", ");
          return (
            <li
              key={index}
              onClick={() => onSelect({ city, region, country })}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                cursor: "pointer"
              }}
            >
              {name}
            </li>
          );
        })}
      </ul>
    );
  }
  
  export default CitySuggest;