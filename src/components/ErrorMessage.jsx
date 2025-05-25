function ErrorMessage({ message }) {
    return (
      <div style={{
        backgroundColor: "#ffe6e6",
        color: "#cc0000",
        padding: "10px 15px",
        marginTop: "20px",
        borderRadius: "5px",
        fontWeight: "bold"
      }}>
        ⚠️ {message}
      </div>
    );
  }
  
  export default ErrorMessage;