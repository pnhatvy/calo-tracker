import {
  IoHomeOutline,
  IoPersonOutline,
  IoTimeOutline,
  IoSettingsOutline,
  IoAddOutline,
} from "react-icons/io5";

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <nav className="bottom-nav">
      <div
        className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
        onClick={() => setActiveTab("dashboard")}
      >
        <IoHomeOutline size={24} />
        <span>Dashboard</span>
      </div>
      <div
        className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
        onClick={() => setActiveTab("profile")}
      >
        <IoPersonOutline size={24} />
        <span>Profile</span>
      </div>

      {/* Floating Add Button */}
      <div className="nav-fab" onClick={() => setActiveTab("add")}>
        <IoAddOutline size={32} />
      </div>

      <div
        className={`nav-item ${activeTab === "history" ? "active" : ""}`}
        onClick={() => setActiveTab("history")}
      >
        <IoTimeOutline size={24} />
        <span>History</span>
      </div>
      <div
        className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
        onClick={() => setActiveTab("settings")}
      >
        <IoSettingsOutline size={24} />
        <span>Settings</span>
      </div>
    </nav>
  );
}
