export default function Stats({ isActive, history }) {
  return (
    <section className={`page ${isActive ? "active" : ""}`}>
      <header>
        <h1>Thống kê</h1>
      </header>
      <div className="stats-card">
        <h3>Hiệu quả Calo / VNĐ</h3>
        <p className="subtitle">Đề xuất món tối ưu chi phí</p>
        <div className="insight-box">
          {history.length > 0 ? (
            history.map((h) =>
              h.cost > 0 && h.kcal > 0 ? (
                <div key={h.id} className="insight-row">
                  <span>{h.name}</span>
                  <strong>{Math.round(h.cost / h.kcal)} đ/kcal</strong>
                </div>
              ) : null,
            )
          ) : (
            <p>Chưa đủ dữ liệu</p>
          )}
        </div>
      </div>
    </section>
  );
}
