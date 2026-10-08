export default function History({ isActive, history }) {
  // Nhóm các bữa ăn theo ngày
  const groupedHistory =
    history?.reduce((acc, item) => {
      if (!acc[item.date]) acc[item.date] = [];
      acc[item.date].push(item);
      return acc;
    }, {}) || {};

  return (
    <section className={`page ${isActive ? "active" : ""}`}>
      <header>
        <h1>History</h1>
        <p className="subtitle">Your food diary</p>
      </header>

      {Object.keys(groupedHistory).length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "var(--text-sub)",
            marginTop: "40px",
            fontWeight: "500",
          }}
        >
          No records yet.
        </p>
      ) : (
        <div className="history-list">
          {Object.keys(groupedHistory).map((date) => (
            <div key={date} style={{ marginBottom: "24px" }}>
              <h4
                style={{
                  margin: "0 0 12px",
                  color: "var(--text-sub)",
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {date}
              </h4>
              {groupedHistory[date].map((item) => (
                <div
                  key={item.id}
                  className="card"
                  style={{
                    padding: "16px 20px",
                    marginBottom: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong
                      style={{
                        fontSize: "17px",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      {item.name}
                    </strong>
                  </div>
                  <div
                    style={{
                      color: "var(--primary)",
                      fontWeight: "700",
                      fontSize: "18px",
                    }}
                  >
                    +{item.kcal}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
