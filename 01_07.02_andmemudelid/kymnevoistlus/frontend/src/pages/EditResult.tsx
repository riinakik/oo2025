import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Result } from "../models/Result";
import { Athlete } from "../models/Athlete";
import { Event } from "../models/Event";

function EditResult() {
  const { resultId } = useParams();
  const resultRef = useRef<HTMLInputElement>(null);
  const eventRef = useRef<HTMLSelectElement>(null);
  const athleteRef = useRef<HTMLSelectElement>(null);

  const [result, setResult] = useState<Result>();
  const [events, setEvents] = useState<Event[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/results/" + resultId)
      .then(res => res.json())
      .then(json => setResult(json));
  }, [resultId]);

  useEffect(() => {
    fetch("http://localhost:8080/events")
      .then(res => res.json())
      .then(json => setEvents(json));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/athletes")
      .then(res => res.json())
      .then(json => setAthletes(json));
  }, []);

  const editResult = () => {
    const modifiedResult = {
      id: resultId,
      result: Number(resultRef.current?.value),
      event: { id: Number(eventRef.current?.value) },
      athlete: { id: Number(athleteRef.current?.value) }
    };

    fetch("http://localhost:8080/results", {
      method: "PUT",
      body: JSON.stringify(modifiedResult),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.message && json.timestamp && json.status) {
          toast.error(json.message);
        } else {
          navigate("/results");
        }
      });
  };

  if (result === undefined) {
    return <div>Result not found</div>;
  }

  return (
    <div>
      <label>Athlete</label><br />
      <select ref={athleteRef} defaultValue={result.athlete.id}>
        {athletes.map(athlete => (
          <option key={athlete.id} value={athlete.id}>
            {athlete.name}
          </option>
        ))}
      </select><br />

      <label>Event</label><br />
      <select ref={eventRef} defaultValue={result.event.id}>
        {events.map(event => (
          <option key={event.id} value={event.id}>
            {event.name}
          </option>
        ))}
      </select><br />

      <label>Result</label><br />
      <input ref={resultRef} defaultValue={result.result} type="number" /><br />

      <button onClick={editResult}>Edit result</button>
      <ToastContainer />
    </div>
  );
}

export default EditResult;
