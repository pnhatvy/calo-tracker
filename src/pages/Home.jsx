import { useState } from "react";

export default function Home({ isActive, goal, history, setHistory }) {
  const [foodName, setFoodName] = useState("");
  const [foodKcal, setFoodKcal] = useState("");
  const [foodCost, setFoodCost] = useState("");
  const [mood, setMood] = useState("Bình thường");

  const addFood = () => {
    if (!foodName || !foodKcal) return alert("Nhập tên món và lượng Kcal nhé!");
    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString("vi-VN"),
      name: foodName,
      kcal: parseInt(foodKcal),
      cost: parseInt(foodCost) || 0,
      mood: mood,
    };
    setHistory([newRecord, ...history]);
    setFoodName("");
    setFoodKcal("");
    setFoodCost("");
    setMood("Bình thường");
  };

  const today = new Date().toLocaleDateString("vi-VN");
  const todayRecords = history.filter((item) => item.date === today);
  const currentKcal = todayRecords.reduce((sum, item) => sum + item.kcal, 0);

  return (
    <section className={`page ${isActive ? "active" : ""}`}>
      <header>
        <h1>Hôm nay</h1>
        <p className="subtitle">Mục tiêu: {goal} kcal</p>
      </header>
      <div className="ring-container">
        <div
          className="ring-circle"
          style={{
            background: `conic-gradient(var(--primary-green) ${(currentKcal / goal) * 360}deg, #E5E5EA 0deg)`,
          }}
        >
          <div className="ring-inner">
            <h2>{currentKcal}</h2>
            <p>kcal</p>
          </div>
        </div>
      </div>
      <div className="action-card">
        <input
          type="text"
          placeholder="Tên món (vd: Phở bò)"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <div className="row-input">
          <input
            type="number"
            placeholder="Kcal"
            value={foodKcal}
            onChange={(e) => setFoodKcal(e.target.value)}
          />
          <input
            type="number"
            placeholder="Giá (VNĐ)"
            value={foodCost}
            onChange={(e) => setFoodCost(e.target.value)}
          />
        </div>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="mood-select"
        >
          <option value="Khoẻ khoắn">Trạng thái: Khoẻ khoắn ⚡</option>
          <option value="Bình thường">Trạng thái: Bình thường 😐</option>
          <option value="Buồn ngủ/Mệt">Trạng thái: Buồn ngủ/Mệt 💤</option>
        </select>
        <button className="btn-primary" onClick={addFood}>
          Ghi nhận
        </button>
      </div>
    </section>
  );
}
