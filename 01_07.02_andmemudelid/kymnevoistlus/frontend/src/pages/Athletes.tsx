import { useEffect, useState } from "react";
import { Athlete } from "../models/Athlete";
import "./Athletes.css";

function Athletes() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/athletes")
      .then((res) => res.json())
      .then((json) => setAthletes(json));
  }, []);

  return (
    <div className="athletes-page">
      <h2>Athletes</h2>
      {athletes.map((athlete) => (
        <div key={athlete.id}>{athlete.name}</div>
      ))}
    </div>
  );
}

export default Athletes;
