export default function Plan({ isActive, budget, setBudget, history }) {
  const totalCost = history.reduce((sum, item) => sum + item.cost, 0);

  return (
    <section className={`page ${isActive ? "active" : ""}`}>
      <header>
        <h1>Kế hoạch</h1>
        <p className="subtitle">Ngân sách tuần: {budget.toLocaleString()}đ</p>
      </header>
      <div className="action-card">
        <p>Thiết lập ngân sách ăn uống:</p>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
        />
      </div>
      <div className="stats-card">
        <h3>Đã chi tiêu: {totalCost.toLocaleString()}đ</h3>
        <p
          style={{
            color:
              totalCost > budget ? "var(--danger)" : "var(--primary-green)",
          }}
        >
          Còn lại: {(budget - totalCost).toLocaleString()}đ
        </p>
      </div>
    </section>
  );
}
