import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Plan from "./pages/Plan";
import History from "./pages/History";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import BottomNav from "./components/BottomNav";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [goal, setGoal] = useState(2000);
  const [budget, setBudget] = useState(500000);
  const [history, setHistory] = useState([]);

  // Lấy dữ liệu khi mở app
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("caloAppData"));
    if (savedData) {
      setGoal(savedData.goal || 2000);
      setBudget(savedData.budget || 500000);
      setHistory(savedData.history || []);
    }
  }, []);

  // Tự động lưu khi state thay đổi
  useEffect(() => {
    localStorage.setItem(
      "caloAppData",
      JSON.stringify({ goal, budget, history }),
    );
  }, [goal, budget, history]);

  return (
    <div className="app-container">
      <Home
        isActive={activeTab === "home"}
        goal={goal}
        history={history}
        setHistory={setHistory}
      />
      <Plan
        isActive={activeTab === "plan"}
        budget={budget}
        setBudget={setBudget}
        history={history}
      />
      <History isActive={activeTab === "history"} history={history} />
      <Stats isActive={activeTab === "stats"} history={history} />
      <Settings
        isActive={activeTab === "settings"}
        goal={goal}
        setGoal={setGoal}
        setHistory={setHistory}
      />

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
