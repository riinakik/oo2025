
import { useEffect, useState } from "react";
import { Event } from "../models/Event";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/events")
      .then((res) => res.json())
      .then((json) => setEvents(json));
  }, []);

  return (
    <div className="events-page">
      <h2>Events</h2>
      {events.map((event) => (
        <div key={event.id}>{event.name}</div>
      ))}
    </div>
  );
}

export default Events;
