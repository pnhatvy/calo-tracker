import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import AddRecord from "./pages/AddRecord";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Settings from "./pages/Settings";
import BottomNav from "./components/BottomNav";
import { format } from "date-fns";
import "./App.css";

const initialMockData = [
  {
    id: 101,
    date: format(new Date(), "yyyy-MM-dd"),
    name: "Beef Noodles (Phở)",
    meal: "Breakfast",
    kcal: 650,
    protein: 35,
    carbs: 85,
    fat: 18,
  },
  {
    id: 102,
    date: format(new Date(), "yyyy-MM-dd"),
    name: "Iced Milk Coffee",
    meal: "Snack",
    kcal: 180,
    protein: 3,
    carbs: 30,
    fat: 6,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const getInitialState = () => {
    const savedData = JSON.parse(localStorage.getItem("caloAppV4"));
    if (savedData) {
      const migratedHistory = (savedData.history || initialMockData).map(h => ({
        ...h,
        date: h.date.includes("/") ? format(new Date(h.date), "yyyy-MM-dd") : h.date,
        meal: h.meal || "Snack"
      }));
      return {
        goal: savedData.goal || 2000,
        water: savedData.water || 0,
        history: migratedHistory,
        isDarkMode: savedData.isDarkMode || false
      };
    }
    return {
      goal: 2000,
      water: 0,
      history: initialMockData,
      isDarkMode: false
    };
  };

  const initialState = getInitialState();

  const [goal, setGoal] = useState(initialState.goal);
  const [water, setWater] = useState(initialState.water); 
  const [history, setHistory] = useState(initialState.history);
  const [isDarkMode, setIsDarkMode] = useState(initialState.isDarkMode);

  useEffect(() => {
    localStorage.setItem(
      "caloAppV4",
      JSON.stringify({ goal, water, history, isDarkMode }),
    );
  }, [goal, water, history, isDarkMode]);

  // Reset water daily based on selectedDate
  useEffect(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    if (selectedDate !== today) {
      // Actually water might need to be an array of {date, amount} if we want to track historically
      // For now, simple implementation
    }
  }, [selectedDate]);

  return (
    <div className="app-container" data-theme={isDarkMode ? "dark" : "light"}>
      <Dashboard
        isActive={activeTab === "dashboard"}
        goal={goal}
        history={history}
        water={water}
        setWater={setWater}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <AddRecord
        isActive={activeTab === "add"}
        history={history}
        setHistory={setHistory}
        setActiveTab={setActiveTab}
        selectedDate={selectedDate}
      />
      <Profile 
        isActive={activeTab === "profile"} 
        goal={goal}
        setGoal={setGoal}
        history={history}
      />
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
