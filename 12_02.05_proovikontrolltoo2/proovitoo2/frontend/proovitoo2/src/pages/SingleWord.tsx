import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Word } from "../models/Word";
import { Link } from "react-router-dom";

// kõik use-ga algavad on Reacti Hookid.

function SingleWord() {
  const { wordTypeID } = useParams();

  // window.location.href.split("/product/")[1] -> tavalises JavaScript
  const [word, setWord] = useState<Word>();

  useEffect(() => {
    fetch("http://localhost:8080/words/" + wordTypeID)
      .then((res) => res.json())
      .then((json) => setWord(json));
  }, [wordTypeID]);

  return (
    <div>
      <div>Sõna: {word?.type}</div>
      <div>Kirjeldus: {word?.description}</div>
      <Link to={"/edit-word/" + word?.typeID}>
        <button>Muuda</button>
      </Link>
    </div>
  );
}

export default SingleWord;
