import { useState } from "react";
import { IoTrashOutline, IoCloudUploadOutline } from "react-icons/io5";

export default function Settings({ isActive, goal, setGoal, setHistory }) {
  const [isSyncing, setIsSyncing] = useState(false);

  const mockSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert("Backup lên Cloud thành công!");
    }, 1500);
  };

  const resetData = () => {
    if (window.confirm("Xoá toàn bộ dữ liệu? Không thể khôi phục!"))
      setHistory([]);
  };

  return (
    <section className={`page ${isActive ? "active" : ""}`}>
      <header>
        <h1>Cài đặt</h1>
      </header>
      <div className="setting-group">
        <div className="setting-item" onClick={mockSync}>
          <span>{isSyncing ? "Đang đồng bộ..." : "Backup & Sync (Cloud)"}</span>
          <IoCloudUploadOutline size={22} color="var(--primary-green)" />
        </div>
        <div className="setting-item">
          <span>Mục tiêu Kcal/ngày</span>
          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
            className="inline-input"
          />
        </div>
        <div className="setting-item danger" onClick={resetData}>
          <span>Xoá toàn bộ dữ liệu</span>
          <IoTrashOutline size={22} />
        </div>
      </div>
    </section>
  );
}
