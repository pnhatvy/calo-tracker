export default function Stats({ isActive, history }) {
  // Tính tổng Kcal toàn thời gian
  const totalKcal = history?.reduce((sum, item) => sum + item.kcal, 0) || 0;
  const totalMeals = history?.length || 0;

  return (
    <section className={`page ${isActive ? "active" : ""}`}>
      <header>
        <h1>Statistics</h1>
        <p className="subtitle">Insights & Analytics</p>
      </header>

      <div className="card">
        <h3 style={{ margin: "0 0 16px", fontSize: "18px" }}>Overview</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "0.5px solid rgba(142, 142, 147, 0.2)",
            paddingBottom: "16px",
            marginBottom: "16px",
          }}
        >
          <span style={{ color: "var(--text-sub)", fontWeight: "500" }}>
            Total Meals Tracked
          </span>
          <strong style={{ fontSize: "17px" }}>{totalMeals}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "var(--text-sub)", fontWeight: "500" }}>
            All-time Kcal
          </span>
          <strong style={{ fontSize: "17px", color: "var(--primary)" }}>
            {totalKcal.toLocaleString()}
          </strong>
        </div>
      </div>
    </section>
  );
}
