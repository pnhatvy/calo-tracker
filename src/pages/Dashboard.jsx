export default function Dashboard({ isActive, goal, history }) {
  const today = new Date().toLocaleDateString("en-US");
  const todayRecords = history.filter((item) => item.date === today);
  const currentKcal = todayRecords.reduce((sum, item) => sum + item.kcal, 0);

  return (
    <section className={`page ${isActive ? "active" : ""}`}>
      <header>
        <h1>Dashboard</h1>
        <p className="subtitle">Daily Goal: {goal} kcal</p>
      </header>
      <div
        className="card"
        style={{ textAlign: "center", padding: "40px 20px" }}
      >
        <h2 style={{ fontSize: "48px", margin: "0", fontWeight: "800" }}>
          {currentKcal}
        </h2>
        <p
          style={{
            color: "var(--text-sub)",
            margin: "8px 0 0",
            fontWeight: "600",
          }}
        >
          KCAL CONSUMED
        </p>
        <div
          style={{
            margin: "24px auto 0",
            width: "100%",
            height: "8px",
            background: "var(--bg-color)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${Math.min((currentKcal / goal) * 100, 100)}%`,
              height: "100%",
              background: "var(--primary)",
              borderRadius: "4px",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
