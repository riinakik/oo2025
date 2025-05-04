import { useEffect, useRef, useState } from "react";
import { Result } from "../models/Result";
import { Event } from "../models/Event";
import { Athlete } from "../models/Athlete";
import "./Results.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

function Results() {
  const [results, setResults] = useState<Result[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  const resultRef = useRef<HTMLInputElement>(null);
  const eventRef = useRef<HTMLSelectElement>(null);
  const athleteRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/results")
      .then((res) => res.json())
      .then((json) => setResults(json));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/events")
      .then((res) => res.json())
      .then((json) => setEvents(json));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/athletes")
      .then((res) => res.json())
      .then((json) => setAthletes(json));
  }, []);

  const addResult = () => {
    const newResult = {
      result: Number(resultRef.current?.value),
      athlete: {
        id: Number(athleteRef.current?.value)
      },
      event: {
        id: Number(eventRef.current?.value)
      }
    };

    fetch("http://localhost:8080/results", {
      method: "POST",
      body: JSON.stringify(newResult),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message === undefined) {
          setResults(json);
          toast.success("Result added!");
        } else {
          toast.error(json.message);
        }
      });
  };

  const deleteResult = (id: number) => {
    fetch(`http://localhost:8080/results/${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((json) => setResults(json));
  };

  return (
    <div className="results-page">
      <h2>Results</h2>

      <label>Athlete</label><br />
      <select ref={athleteRef}>
        {athletes.map((athlete) => (
          <option key={athlete.id} value={athlete.id}>{athlete.name}</option>
        ))}
      </select><br />

      <label>Event</label><br />
      <select ref={eventRef}>
        {events.map((event) => (
          <option key={event.id} value={event.id}>{event.name}</option>
        ))}
      </select><br />

      <label>Result</label><br />
      <input ref={resultRef} type="number" /><br />

      <button onClick={addResult}>Add Result</button>

      <table className="results-table">
        <thead>
          <tr>
            <th>Athlete</th>
            <th>Event</th>
            <th>Result</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => {
            const isThrow = ["shot put", "discus throw", "javelin throw"].includes(result.event.name);
            const isTrack = result.event.name.includes("m") && !result.event.name.includes("jump");
            const isJump = result.event.name.includes("jump");
            const unit = isTrack ? "s" : isJump ? "cm" : isThrow ? "m" : "";
            return (
              <tr key={index}>
                <td>{result.athlete.name}</td>
                <td>{result.event.name}</td>
                <td>{result.result} {unit}</td>
                <td>{result.score}</td>
                <td>
                  <button onClick={() => deleteResult(result.id)}>Delete</button>
                </td>
                <td>
              <Link to={"/results/edit-result/" + result.id}>
                 <button>Edit</button>
              </Link>
              </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default Results;

