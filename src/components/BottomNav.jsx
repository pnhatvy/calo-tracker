import {
  IoTodayOutline,
  IoCalendarOutline,
  IoTimeOutline,
  IoPieChartOutline,
  IoSettingsOutline,
} from "react-icons/io5";

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <nav className="bottom-nav">
      <div
        className={`nav-item ${activeTab === "home" ? "active" : ""}`}
        onClick={() => setActiveTab("home")}
      >
        <IoTodayOutline size={24} />
        <span>Hôm nay</span>
      </div>
      <div
        className={`nav-item ${activeTab === "plan" ? "active" : ""}`}
        onClick={() => setActiveTab("plan")}
      >
        <IoCalendarOutline size={24} />
        <span>Plan</span>
      </div>
      <div
        className={`nav-item ${activeTab === "history" ? "active" : ""}`}
        onClick={() => setActiveTab("history")}
      >
        <IoTimeOutline size={24} />
        <span>Lịch sử</span>
      </div>
      <div
        className={`nav-item ${activeTab === "stats" ? "active" : ""}`}
        onClick={() => setActiveTab("stats")}
      >
        <IoPieChartOutline size={24} />
        <span>Thống kê</span>
      </div>
      <div
        className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
        onClick={() => setActiveTab("settings")}
      >
        <IoSettingsOutline size={24} />
        <span>Cài đặt</span>
      </div>
    </nav>
  );
}
