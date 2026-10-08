import { useState } from "react";

export default function AddRecord({
  isActive,
  history,
  setHistory,
  setActiveTab,
}) {
  const [foodName, setFoodName] = useState("");
  const [foodKcal, setFoodKcal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const handleAdd = () => {
    if (!foodName || !foodKcal) return;
    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US"),
      name: foodName,
      kcal: parseInt(foodKcal),
      protein: parseInt(protein) || 0,
      carbs: parseInt(carbs) || 0,
      fat: parseInt(fat) || 0,
    };
    setHistory([newRecord, ...history]);

    // Reset form
    setFoodName("");
    setFoodKcal("");
    setProtein("");
    setCarbs("");
    setFat("");
    setActiveTab("dashboard");
  };

  return (
    <section className={`page ${isActive ? "active" : ""}`}>
      <header>
        <h1>Add Meal</h1>
        <p className="subtitle">Log your macros</p>
      </header>

      <div className="card">
        <input
          type="text"
          placeholder="Food Name (e.g. Avocado Toast)"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Total Kcal"
          value={foodKcal}
          onChange={(e) => setFoodKcal(e.target.value)}
        />

        <div className="input-row">
          <input
            type="number"
            placeholder="Protein (g)"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
          />
          <input
            type="number"
            placeholder="Carbs (g)"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
          />
          <input
            type="number"
            placeholder="Fat (g)"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
          />
        </div>

        <button
          className="btn-primary"
          onClick={handleAdd}
          style={{ marginTop: "8px" }}
        >
          Log to Diary
        </button>
      </div>
    </section>
  );
}
