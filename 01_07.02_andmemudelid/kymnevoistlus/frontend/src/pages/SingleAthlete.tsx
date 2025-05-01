import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Athlete } from '../models/Athlete';

function SingleAthlete() {
  // <Route path="/athlete/:athleteId" element={ <SingleAthlete /> } />
  const { athleteId } = useParams();

  const [athlete, setAthlete] = useState<Athlete>();

  useEffect(() => {
    fetch("http://localhost:8080/athletes/" + athleteId)
      .then(res => res.json())
      .then(json => setAthlete(json));
  }, [athleteId]);

  return (
    <div>
      <div>Nimi: {athlete?.name}</div>
      <div>Vanus: {athlete?.age}</div>
      <div>Riik: {athlete?.country}</div>
    </div>
  );
}

export default SingleAthlete;
