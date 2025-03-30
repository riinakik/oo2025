import { useEffect, useState } from "react";
import { Result } from "../models/Result";
import "./Results.css";

function Results() {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/results")
      .then((res) => res.json())
      .then((json) => setResults(json));
  }, []);

  return (
    <div className="results-page">
      <h2>Results</h2>
      {results.map((result, index) => {
        const track = result.event.name.includes("m") && !result.event.name.includes("jump");
        const jump = result.event.name.includes("jump");
        const unit = track ? "sek" : jump ? "m" : "";
        return (
          <div key={index}>
            {result.athlete.name} – {result.event.name}: {result.result}
            {unit} – {result.score} points
          </div>
        );
      })}
    </div>
  );
}

export default Results;
