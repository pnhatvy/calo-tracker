import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import AddRecord from "./pages/AddRecord";
import Plan from "./pages/Plan";
import History from "./pages/History";
import Settings from "./pages/Settings";
import BottomNav from "./components/BottomNav";
import "./App.css";

// Dữ liệu mẫu (Mock Data)
const initialMockData = [
  {
    id: 101,
    date: new Date().toLocaleDateString("en-US"),
    name: "Beef Noodles (Phở)",
    kcal: 650,
    protein: 35,
    carbs: 85,
    fat: 18,
  },
  {
    id: 102,
    date: new Date().toLocaleDateString("en-US"),
    name: "Iced Milk Coffee",
    kcal: 180,
    protein: 3,
    carbs: 30,
    fat: 6,
  },
  {
    id: 103,
    date: new Date().toLocaleDateString("en-US"),
    name: "Grilled Chicken Salad",
    kcal: 320,
    protein: 45,
    carbs: 12,
    fat: 10,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [goal, setGoal] = useState(2000);
  const [water, setWater] = useState(0); // Tính bằng ml
  const [history, setHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("caloAppV3"));
    if (savedData) {
      setGoal(savedData.goal || 2000);
      setWater(savedData.water || 0);
      setHistory(savedData.history || initialMockData);
      setIsDarkMode(savedData.isDarkMode || false);
    } else {
      setHistory(initialMockData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "caloAppV3",
      JSON.stringify({ goal, water, history, isDarkMode }),
    );
  }, [goal, water, history, isDarkMode]);

  // Reset nước mỗi ngày (Logic đơn giản: nếu record đầu tiên khác ngày nay thì reset)
  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US");
    const lastRecordDate = history.length > 0 ? history[0].date : today;
    if (lastRecordDate !== today && water > 0) setWater(0);
  }, [history, water]);

  return (
    <div className="app-container" data-theme={isDarkMode ? "dark" : "light"}>
      <Dashboard
        isActive={activeTab === "dashboard"}
        goal={goal}
        history={history}
        water={water}
        setWater={setWater}
      />
      <AddRecord
        isActive={activeTab === "add"}
        history={history}
        setHistory={setHistory}
        setActiveTab={setActiveTab}
      />
      <Plan isActive={activeTab === "plan"} />
      <History
        isActive={activeTab === "history"}
        history={history}
        setHistory={setHistory}
      />
      <Settings
        isActive={activeTab === "settings"}
        goal={goal}
        setGoal={setGoal}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setHistory={setHistory}
      />

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
