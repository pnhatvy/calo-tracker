import { useState } from "react";

export default function AddRecord({
  isActive,
  history,
  setHistory,
  setActiveTab,
}) {
  const [foodName, setFoodName] = useState("");
  const [foodKcal, setFoodKcal] = useState("");

  const handleAdd = () => {
    if (!foodName || !foodKcal) return;
    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US"),
      name: foodName,
      kcal: parseInt(foodKcal),
    };
    setHistory([newRecord, ...history]);
    setFoodName("");
    setFoodKcal("");
    setActiveTab("dashboard"); // Tự động quay về Dashboard sau khi add
  };

  return (
    <section className={`page ${isActive ? "active" : ""}`}>
      <header>
        <h1>Add Meal</h1>
      </header>
      <div className="card">
        <input
          type="text"
          placeholder="Food Name (e.g., Chicken Salad)"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories (kcal)"
          value={foodKcal}
          onChange={(e) => setFoodKcal(e.target.value)}
        />
        <button
          className="btn-primary"
          onClick={handleAdd}
          style={{ marginTop: "16px" }}
        >
          Save Record
        </button>
      </div>
    </section>
  );
}
