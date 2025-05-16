import { useEffect, useRef, useState } from "react";
import { Comment } from "../models/Comment";
import { Link } from "react-router-dom";
import { Person } from "../models/Person";

function MainPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [person, setPerson] = useState<Person[]>([]);
  const [selectedPersonId, setSelectedPersonId] = useState("");
  const [postId, setPostId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const postIdRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/comments")
      .then((res) => res.json())
      .then((json) => setComments(json.content)); // ← ainult `content` massiiv
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/persons")
      .then((res) => res.json())
      .then((data) => setPerson(data)); // ← isikud salvestatakse siia
  }, []);

  const addComment = () => {
    const newComment: Comment = {
      postId: Number(postId),
      name: name,
      email: email,
      body: body,
      person: {
        id: Number(selectedPersonId),
      },
    };

    fetch("http://localhost:8080/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((res) => res.json())
      .then((json) => {
        setComments(json);
        setPostId("");
        setName("");
        setEmail("");
        setBody("");
        if (postIdRef.current) postIdRef.current.focus();
      });
  };

  return (
    <div>
      <h2>Lisa kommentaar</h2>

      <input
        ref={postIdRef}
        type="number"
        placeholder="Post ID"
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
      />
      <br />

      <select
        value={selectedPersonId}
        onChange={(e) => setSelectedPersonId(e.target.value)}
      >
        <option value="">-- Vali isik --</option>
        {person.map((person) => (
          <option key={person.id} value={person.id}>
            {person.name}
          </option>
        ))}
      </select>
      <br />

      <input
        ref={nameRef}
        type="text"
        placeholder="Kommentaari nimi"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
        ref={emailRef}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <textarea
        ref={bodyRef}
        placeholder="Kommentaar"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <br />

      <button onClick={addComment}>Salvesta</button>

      <h2>Kommentaarid</h2>
      {comments.map((comment) => (
        <Link to={`/comments/${comment.id}`} key={comment.id}>
          <div>
            <small>Post ID: {comment.postId}</small>
            <br />
            <strong>{comment.name}</strong> ({comment.email})
            <p>{comment.body}</p>
          </div>
        </Link>
      ))}

      <br />
      <Link to="/persons">
        <button>Näita kasutajate kommentaare</button>
      </Link>
    </div>
  );
}

export default MainPage;
