export default function History({ isActive, history }) {
  const today = new Date().toLocaleDateString("vi-VN");
  const groupedHistory = history.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  return (
    <section className={`page ${isActive ? "active" : ""}`}>
      <header>
        <h1>Lịch sử</h1>
      </header>
      <div className="history-list">
        {Object.keys(groupedHistory).map((date) => (
          <div key={date} className="history-group">
            <h4>{date === today ? "Hôm nay" : date}</h4>
            {groupedHistory[date].map((item) => (
              <div key={item.id} className="history-item">
                <div className="item-info">
                  <strong>{item.name}</strong>
                  <span className="item-sub">
                    {item.cost > 0 ? item.cost.toLocaleString() + "đ" : ""} •{" "}
                    {item.mood}
                  </span>
                </div>
                <div className="item-kcal">+{item.kcal}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
