import { useState, useRef } from "react";
import { IoTrashOutline } from "react-icons/io5";

// Component con xử lý Vuốt xoá từng item
function SwipeableItem({ item, onDelete }) {
  const [offsetX, setOffsetX] = useState(0);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);

  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    currentXRef.current = e.touches[0].clientX;
    const diff = currentXRef.current - startXRef.current;
    if (diff < 0 && diff > -100) {
      // Chỉ cho phép vuốt sang trái tối đa 100px
      setOffsetX(diff);
    }
  };

  const handleTouchEnd = () => {
    if (offsetX < -50) {
      setOffsetX(-80); // Giữ mở menu xoá
    } else {
      setOffsetX(0); // Bật ngược lại nếu vuốt chưa đủ lực
    }
  };

  return (
    <div className="swipe-container">
      <div className="swipe-action" onClick={() => onDelete(item.id)}>
        <IoTrashOutline size={24} />
      </div>
      <div
        className="swipe-content"
        style={{ transform: `translateX(${offsetX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div>
          <strong
            style={{ fontSize: "17px", display: "block", marginBottom: "4px" }}
          >
            {item.name}
          </strong>
          <span style={{ fontSize: "13px", color: "var(--text-sub)" }}>
            P: {item.protein}g • C: {item.carbs}g • F: {item.fat}g
          </span>
        </div>
        <div style={{ fontWeight: "800", fontSize: "20px" }}>{item.kcal}</div>
      </div>
    </div>
  );
}

export default function History({ isActive, history, setHistory }) {
  const groupedHistory =
    history?.reduce((acc, item) => {
      if (!acc[item.date]) acc[item.date] = [];
      acc[item.date].push(item);
      return acc;
    }, {}) || {};

  const handleDelete = (id) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  return (
    <section className={`page ${isActive ? "active" : ""}`}>
      <header>
        <h1>History</h1>
        <p className="subtitle">Swipe left to delete</p>
      </header>

      {Object.keys(groupedHistory).length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "var(--text-sub)",
            marginTop: "40px",
          }}
        >
          No records yet.
        </p>
      ) : (
        <div className="history-list">
          {Object.keys(groupedHistory).map((date) => (
            <div key={date} style={{ marginBottom: "32px" }}>
              <h4
                style={{
                  margin: "0 0 12px 8px",
                  color: "var(--text-sub)",
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {date}
              </h4>
              {groupedHistory[date].map((item) => (
                <SwipeableItem
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
