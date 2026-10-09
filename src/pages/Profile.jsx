import { useState } from "react";

export default function Profile({ isActive, goal, setGoal }) {
  const getProfile = () => {
    const profile = JSON.parse(localStorage.getItem("caloAppProfile"));
    return profile || {
      weight: 70,
      height: 170,
      age: 25,
      gender: "male",
      activity: 1.2
    };
  };

  const initialProfile = getProfile();

  const [weight, setWeight] = useState(initialProfile.weight);
  const [height, setHeight] = useState(initialProfile.height);
  const [age, setAge] = useState(initialProfile.age);
  const [gender, setGender] = useState(initialProfile.gender);
  const [activity, setActivity] = useState(initialProfile.activity);

  const calculateTDEE = () => {
    // Mifflin-St Jeor Equation
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr += gender === "male" ? 5 : -161;
    const tdee = Math.round(bmr * activity);
    setGoal(tdee);
    
    localStorage.setItem("caloAppProfile", JSON.stringify({
      weight, height, age, gender, activity
    }));
    alert(`Your new daily goal is ${tdee} kcal!`);
  };

  return (
    <section className={`page ${isActive ? "active" : ""}`}>
      <header>
        <h1>Profile & Goal</h1>
        <p className="subtitle">Calculate your TDEE</p>
      </header>

      <div className="card">
        <h3 style={{ margin: "0 0 16px", fontSize: "17px" }}>Personal Info</h3>
        <div className="input-row">
          <div style={{width: '50%'}}>
            <label style={{fontSize: '13px', color: 'var(--text-sub)'}}>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} style={{width: '100%', padding: '12px', borderRadius: '12px', background: 'var(--bg-color)', border: 'none', marginTop: '4px', color: 'var(--text-main)'}}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div style={{width: '50%'}}>
            <label style={{fontSize: '13px', color: 'var(--text-sub)'}}>Age</label>
            <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} style={{margin: 0, padding: '12px'}}/>
          </div>
        </div>
        
        <div className="input-row" style={{marginTop: '16px'}}>
          <div style={{width: '50%'}}>
            <label style={{fontSize: '13px', color: 'var(--text-sub)'}}>Weight (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} style={{margin: 0, padding: '12px'}}/>
          </div>
          <div style={{width: '50%'}}>
            <label style={{fontSize: '13px', color: 'var(--text-sub)'}}>Height (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} style={{margin: 0, padding: '12px'}}/>
          </div>
        </div>

        <div style={{marginTop: '16px'}}>
          <label style={{fontSize: '13px', color: 'var(--text-sub)'}}>Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(Number(e.target.value))} style={{width: '100%', padding: '12px', borderRadius: '12px', background: 'var(--bg-color)', border: 'none', marginTop: '4px', color: 'var(--text-main)'}}>
            <option value={1.2}>Sedentary (little to no exercise)</option>
            <option value={1.375}>Lightly active (light exercise 1-3 days)</option>
            <option value={1.55}>Moderately active (moderate exercise 3-5 days)</option>
            <option value={1.725}>Very active (hard exercise 6-7 days)</option>
            <option value={1.9}>Extra active (very hard exercise & physical job)</option>
          </select>
        </div>

        <button className="btn-primary" onClick={calculateTDEE} style={{ marginTop: "24px" }}>
          Recalculate Goal
        </button>
      </div>

      <div className="card" style={{ background: "var(--primary)", color: "white" }}>
        <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>Daily Goal</h3>
        <h2 style={{ margin: "0", fontSize: "40px", fontWeight: "800" }}>
          {goal} kcal
        </h2>
      </div>
    </section>
  );
}

