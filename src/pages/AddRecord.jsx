import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddRecord({
  isActive,
  history,
  setHistory,
  setActiveTab,
  selectedDate
}) {
  const [foodName, setFoodName] = useState("");
  const [meal, setMeal] = useState("Breakfast");
  const [foodKcal, setFoodKcal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const handleAdd = () => {
    if (!foodName || !foodKcal) return;
    const newRecord = {
      id: uuidv4(),
      date: selectedDate, // Use the selected date instead of today!
      name: foodName,
      meal: meal,
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
        <h1>Add Food</h1>
        <p className="subtitle">Log your meals for {selectedDate}</p>
      </header>

      <div className="card">
        <label style={{fontSize: '13px', color: 'var(--text-sub)', display: 'block', marginBottom: '8px'}}>Meal Type</label>
        <select 
          value={meal} 
          onChange={(e) => setMeal(e.target.value)}
          style={{width: '100%', padding: '16px', borderRadius: '16px', background: 'var(--bg-color)', border: 'none', marginBottom: '16px', fontSize: '16px', color: 'var(--text-main)'}}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>

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
