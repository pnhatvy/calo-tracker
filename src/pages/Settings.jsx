export default function Settings({
  isActive,
  goal,
  setGoal,
  isDarkMode,
  setIsDarkMode,
  setHistory,
}) {
  return (
    <section className={`page ${isActive ? "active" : ""}`}>
      <header>
        <h1>Settings</h1>
      </header>
      <div className="card">
        <div className="setting-item">
          <span>Dark Mode</span>
          <div
            className={`toggle-switch ${isDarkMode ? "" : "off"}`}
            onClick={() => setIsDarkMode(!isDarkMode)}
          ></div>
        </div>
        <div
          className="setting-item"
          style={{ paddingTop: "24px", border: "none" }}
        >
          <span>Daily Target</span>
          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
            style={{
              width: "80px",
              margin: 0,
              padding: "8px 12px",
              textAlign: "right",
            }}
          />
        </div>
      </div>

      <div className="card">
        <div
          className="setting-item"
          style={{ color: "var(--danger)", cursor: "pointer", border: "none" }}
          onClick={() => {
            if (window.confirm("Erase all data?")) setHistory([]);
          }}
        >
          <span>Clear All Data</span>
        </div>
      </div>
    </section>
  );
}
