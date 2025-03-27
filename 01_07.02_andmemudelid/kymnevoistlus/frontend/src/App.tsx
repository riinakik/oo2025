import {useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Athlete } from './Models/Athlete';
import { Event } from './Models/Event';
import { Result } from './Models/Result';
import { AthletePoints } from './Models/AthletePoints';


function App() {

  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [athletePointsList, setAthletePointsList] = useState<AthletePoints[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/athletes") //Api otspunkt kuhu läheb päring
        .then(res=>res.json()) //kogu tagastus: headers, status code,
        .then(json=> setAthletes(json)) //body: sisu, mida tagastab back-end
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/events") //Api otspunkt kuhu läheb päring
        .then(res=>res.json()) //kogu tagastus: headers, status code,
        .then(json=> setEvents(json)) //body: sisu, mida tagastab back-end
  }, []); 

  useEffect(() => {
    fetch("http://localhost:8080/results") //Api otspunkt kuhu läheb päring
        .then(res=>res.json()) //kogu tagastus: headers, status code,
        .then(json=> setResults(json)) //body: sisu, mida tagastab back-end
  }, []); 

  useEffect(() => {
    fetch("http://localhost:8080/athletesWithPoints") //Api otspunkt kuhu läheb päring
        .then(res=>res.json()) //kogu tagastus: headers, status code,
        .then(json=> setAthletePointsList(json)) //body: sisu, mida tagastab back-end
  }, []); 

  return (
    <div>
      {athletes.map(athlete => 
        <div key={athlete.id}>
          {athlete.name}
        </div>
      )}
      <br />

      {events.map(event => 
        <div key={event.id}>
          {event.name}
        </div>
      )}
      <br />

      {results.map((result, index) => {
        const track = result.event.name.includes('m') && !result.event.name.includes('jump');
        const jump = result.event.name.includes('jump');
        const unit = track ? 'sek' : jump ? 'm' : '';
      return (
        <div key={index}>
          {result.athlete.name} – {result.event.name}: {result.result}{unit} – {result.score} points
        </div>
        );
      })}
      <br />

      {athletePointsList.map(athlete => 
        <div key={athlete.id}>
          {athlete.name} – {athlete.totalPoints} points
        </div>
      )}
    </div>
  );
  
}

// key={}
// React soovib koodi mällu jätta. Kui toimuvad re-renderdused, siis tajätab kõik mällu.
// v.a. tsükli/array sisud, sest tal pole aimu, mille järgi seda meelde jätta. 
// Selleks, et saaks meelde jätta, lisame key

export default App
