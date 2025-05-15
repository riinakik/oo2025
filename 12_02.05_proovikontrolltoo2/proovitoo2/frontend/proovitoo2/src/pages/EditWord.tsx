import { useEffect, useRef, useState } from "react";
import { Word } from "../models/Word";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function EditWord() {
  const { wordTypeID } = useParams(); // App.tsx: <Route path="/admin/edit-product/:productId" />
  const typeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [word, setWord] = useState<Word>();

  useEffect(() => {
    fetch("http://localhost:8080/words/" + wordTypeID)
      .then((res) => res.json())
      .then((json) => setWord(json));
  }, [wordTypeID]);

  const editWord = () => {
    const modifiedWord = {
      typeID: Number(wordTypeID),
      type: typeRef.current?.value,
      description: descriptionRef.current?.value, //kui numbriline väärtus, peaks Number() ümber panema
    };

    fetch("http://localhost:8080/words", {
      method: "PUT",
      body: JSON.stringify(modifiedWord),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message && json.timestamp && json.status) {
          //alert(json.message);
          toast.error(json.message);
        } else {
          navigate("/");
        }
      });
  };

  if (word === undefined) {
    return <div>Word not found</div>;
  }

  return (
    <div>
      <label>Sõna</label> <br />
      <input ref={typeRef} defaultValue={word?.type} type="text" /> <br />
      <label>Kirjeldus</label> <br />
      <input
        ref={descriptionRef}
        defaultValue={word?.description}
        type="text"
      />{" "}
      <br />
      <button onClick={() => editWord()}>Muuda sõna</button>
      <ToastContainer />
    </div>
  );
}

export default EditWord;
