import { IoWaterOutline, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { format, addDays, subDays, isToday } from "date-fns";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function Dashboard({
  isActive,
  goal,
  history,
  water,
  setWater,
  selectedDate,
  setSelectedDate,
}) {
  const currentRecords = history.filter((item) => item.date === selectedDate);

  const currentKcal = currentRecords.reduce((sum, item) => sum + item.kcal, 0);
  const currentProtein = currentRecords.reduce((sum, item) => sum + (item.protein || 0), 0);
  const currentCarbs = currentRecords.reduce((sum, item) => sum + (item.carbs || 0), 0);
  const currentFat = currentRecords.reduce((sum, item) => sum + (item.fat || 0), 0);

  const addWater = () => setWater((prev) => prev + 250);

  const handlePrevDay = () => {
    setSelectedDate(format(subDays(new Date(selectedDate), 1), "yyyy-MM-dd"));
  };
  const handleNextDay = () => {
    setSelectedDate(format(addDays(new Date(selectedDate), 1), "yyyy-MM-dd"));
  };

  const remainingKcal = goal - currentKcal;

  const macroData = [
    { name: "Protein", value: currentProtein * 4, color: "#FF9F0A" },
    { name: "Carbs", value: currentCarbs * 4, color: "#32ADE6" },
    { name: "Fat", value: currentFat * 9, color: "#FF375F" },
  ];
  // If no macros, show a grey ring
  if (currentProtein === 0 && currentCarbs === 0 && currentFat === 0) {
    macroData.push({ name: "Empty", value: 1, color: "#E5E5EA" });
  }

  // Calculate meal totals
  const getMealTotal = (mealName) => {
    return currentRecords.filter(r => r.meal === mealName).reduce((sum, item) => sum + item.kcal, 0);
  };

  return (
    <section className={`page ${isActive ? "active" : ""}`}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Dashboard</h1>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
            <button onClick={handlePrevDay} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-main)' }}><IoChevronBackOutline size={20}/></button>
            <span style={{ margin: '0 12px', fontWeight: '600', fontSize: '15px' }}>
              {isToday(new Date(selectedDate)) ? "Today" : format(new Date(selectedDate), "MMM dd, yyyy")}
            </span>
            <button onClick={handleNextDay} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-main)' }}><IoChevronForwardOutline size={20}/></button>
          </div>
        </div>
      </header>

      <div className="card" style={{ display: 'flex', alignItems: 'center', padding: '24px' }}>
        <div style={{ width: '120px', height: '120px', position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={macroData}
                innerRadius={45}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {macroData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '20px', fontWeight: '800' }}>{currentKcal}</span>
            <span style={{ fontSize: '10px', color: 'var(--text-sub)' }}>kcal</span>
          </div>
        </div>
        
        <div style={{ marginLeft: '24px', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-sub)', fontWeight: '600' }}>Goal</span>
              <span style={{ fontSize: '16px', fontWeight: '700' }}>{goal}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-sub)', fontWeight: '600' }}>Left</span>
              <span style={{ fontSize: '16px', fontWeight: '700', color: remainingKcal < 0 ? 'var(--danger)' : 'var(--primary)' }}>
                {Math.abs(remainingKcal)} {remainingKcal < 0 ? 'over' : ''}
              </span>
            </div>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'var(--bg-color)', borderRadius: '3px', overflow: 'hidden' }}>
             <div style={{ width: `${Math.min((currentKcal / goal) * 100, 100)}%`, height: '100%', background: remainingKcal < 0 ? 'var(--danger)' : 'var(--primary)', transition: 'width 0.5s ease' }}></div>
          </div>
        </div>
      </div>

      <div className="macro-grid" style={{ marginTop: '0' }}>
        <div className="macro-box">
          <span>Protein</span>
          <strong style={{ color: "#FF9F0A" }}>{currentProtein}g</strong>
        </div>
        <div className="macro-box">
          <span>Carbs</span>
          <strong style={{ color: "#32ADE6" }}>{currentCarbs}g</strong>
        </div>
        <div className="macro-box">
          <span>Fat</span>
          <strong style={{ color: "#FF375F" }}>{currentFat}g</strong>
        </div>
      </div>
      
      <h3 style={{ margin: "24px 0 12px", fontSize: "18px", paddingLeft: "4px" }}>Meals</h3>
      <div className="card" style={{ padding: "0" }}>
        {["Breakfast", "Lunch", "Dinner", "Snack"].map((mealName, idx) => (
          <div key={mealName} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', borderBottom: idx < 3 ? '0.5px solid rgba(142, 142, 147, 0.2)' : 'none' }}>
            <span style={{ fontWeight: '600', fontSize: '15px' }}>{mealName}</span>
            <span style={{ color: 'var(--text-sub)', fontWeight: '500' }}>{getMealTotal(mealName)} kcal</span>
          </div>
        ))}
      </div>

      <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h3 style={{ margin: "0 0 4px", fontSize: "17px" }}>Water Tracker</h3>
          <p style={{ margin: 0, color: "var(--text-sub)", fontWeight: "500" }}>
            {water} / 2000 ml
          </p>
        </div>
        <button
          onClick={addWater}
          style={{ width: "48px", height: "48px", borderRadius: "50%", border: "none", background: "#32ADE6", color: "white", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}
        >
          <IoWaterOutline size={24} />
        </button>
      </div>
    </section>
  );
}
