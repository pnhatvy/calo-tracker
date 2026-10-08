import { useState, useEffect } from "react";

export default function Plan({ isActive }) {
  const [budget, setBudget] = useState(500000);

  // Tự động lưu budget riêng lẻ để không phải truyền prop phức tạp từ App.jsx
  useEffect(() => {
    const savedBudget = localStorage.getItem("caloAppV2_budget");
    if (savedBudget) setBudget(Number(savedBudget));
  }, []);

  const handleBudgetChange = (e) => {
    const newBudget = Number(e.target.value);
    setBudget(newBudget);
    localStorage.setItem("caloAppV2_budget", newBudget);
  };

  return (
    <section className={`page ${isActive ? "active" : ""}`}>
      <header>
        <h1>Weekly Plan</h1>
        <p className="subtitle">Budget & Goals</p>
      </header>

      <div className="card">
        <p style={{ margin: "0 0 12px", fontWeight: "600" }}>
          Weekly Budget (VND)
        </p>
        <input
          type="number"
          placeholder="e.g. 500000"
          value={budget}
          onChange={handleBudgetChange}
          style={{ marginBottom: "0" }}
        />
      </div>

      <div
        className="card"
        style={{ background: "var(--primary)", color: "white" }}
      >
        <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>Current Budget</h3>
        <h2 style={{ margin: "0", fontSize: "32px", fontWeight: "800" }}>
          {budget.toLocaleString()} đ
        </h2>
      </div>
    </section>
  );
}
