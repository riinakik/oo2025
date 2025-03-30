import { useEffect, useState } from "react";
import { AthletePoints } from "../models/AthletePoints";
import "./TotalPoints.css";

function TotalPoints() {
  const [athletePointsList, setAthletePointsList] = useState<AthletePoints[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/athletesWithPoints")
      .then((res) => res.json())
      .then((json) => setAthletePointsList(json));
  }, []);

  return (
    <div className="totalpoints-page">
      <h2>Total Points</h2>
      {athletePointsList.map((athlete) => (
        <div key={athlete.id}>
          {athlete.name} – {athlete.totalPoints} points
        </div>
      ))}
    </div>
  );
}

export default TotalPoints;
