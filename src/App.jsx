import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import AddRecord from "./pages/AddRecord";
import Plan from "./pages/Plan";
import History from "./pages/History";
import Settings from "./pages/Settings";
import BottomNav from "./components/BottomNav";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [goal, setGoal] = useState(2000);
  const [history, setHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("caloAppV2"));
    if (savedData) {
      setGoal(savedData.goal || 2000);
      setHistory(savedData.history || []);
      setIsDarkMode(savedData.isDarkMode || false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "caloAppV2",
      JSON.stringify({ goal, history, isDarkMode }),
    );
  }, [goal, history, isDarkMode]);

  return (
    <div className="app-container" data-theme={isDarkMode ? "dark" : "light"}>
      <Dashboard
        isActive={activeTab === "dashboard"}
        goal={goal}
        history={history}
      />
      <AddRecord
        isActive={activeTab === "add"}
        history={history}
        setHistory={setHistory}
        setActiveTab={setActiveTab}
      />
      <Plan isActive={activeTab === "plan"} />
      <History isActive={activeTab === "history"} history={history} />
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
