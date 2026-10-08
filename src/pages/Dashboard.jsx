import { IoWaterOutline } from "react-icons/io5";

export default function Dashboard({
  isActive,
  goal,
  history,
  water,
  setWater,
}) {
  const today = new Date().toLocaleDateString("en-US");
  const todayRecords = history.filter((item) => item.date === today);

  const currentKcal = todayRecords.reduce((sum, item) => sum + item.kcal, 0);
  const currentProtein = todayRecords.reduce(
    (sum, item) => sum + (item.protein || 0),
    0,
  );
  const currentCarbs = todayRecords.reduce(
    (sum, item) => sum + (item.carbs || 0),
    0,
  );
  const currentFat = todayRecords.reduce(
    (sum, item) => sum + (item.fat || 0),
    0,
  );

  const addWater = () => setWater((prev) => prev + 250);

  return (
    <section className={`page ${isActive ? "active" : ""}`}>
      <header>
        <h1>Dashboard</h1>
        <p className="subtitle">Daily Goal: {goal} kcal</p>
      </header>

      <div
        className="card"
        style={{
          textAlign: "center",
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontSize: "56px",
            margin: "0",
            fontWeight: "800",
            letterSpacing: "-2px",
          }}
        >
          {currentKcal}
        </h2>
        <p
          style={{
            color: "var(--text-sub)",
            margin: "8px 0 0",
            fontWeight: "600",
            fontSize: "13px",
            letterSpacing: "1px",
          }}
        >
          KCAL CONSUMED
        </p>
        <div
          style={{
            margin: "32px auto 0",
            width: "100%",
            height: "6px",
            background: "var(--bg-color)",
            borderRadius: "3px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${Math.min((currentKcal / goal) * 100, 100)}%`,
              height: "100%",
              background: "var(--text-main)",
              borderRadius: "3px",
              transition: "width 0.5s ease",
            }}
          ></div>
        </div>
      </div>

      <div className="macro-grid">
        <div className="macro-box">
          <span>Protein</span>
          <strong style={{ color: "#FF9F0A" }}>{currentProtein}g</strong>
        </div>
        <div className="macro-box">
          <span>Carbs</span>
          <strong style={{ color: "#32ADE6" }}>{currentCarbs}g</strong>
        </div>
        <div className="macro-box">
          <span>Fat</span>
          <strong style={{ color: "#FF375F" }}>{currentFat}g</strong>
        </div>
      </div>

      <div
        className="card"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "24px",
        }}
      >
        <div>
          <h3 style={{ margin: "0 0 4px", fontSize: "17px" }}>Water Tracker</h3>
          <p style={{ margin: 0, color: "var(--text-sub)", fontWeight: "500" }}>
            {water} / 2000 ml
          </p>
        </div>
        <button
          onClick={addWater}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "none",
            background: "#32ADE6",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <IoWaterOutline size={24} />
        </button>
      </div>
    </section>
  );
}
