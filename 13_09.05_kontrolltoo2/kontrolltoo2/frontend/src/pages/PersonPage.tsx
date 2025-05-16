import { useEffect, useRef, useState } from "react";
import { Comment } from "../models/Comment";
import { Person } from "../models/Person";

function Persons() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);
  const [personId, setPersonId] = useState<number>(-1);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [commentsByPage, setCommentsByPage] = useState(5);
  const [sort, setSort] = useState("id,asc");
  const [page, setPage] = useState(0);

  const commentsByPageRef = useRef<HTMLSelectElement>(null);

  // Lae kõik isikud
  useEffect(() => {
    fetch("http://localhost:8080/persons")
      .then((res) => res.json())
      .then((data) => setPersons(data));
  }, []);

  // Lae kommentaarid (kas pagineeritult või isiku omad)
  useEffect(() => {
    let url = "";

    if (personId === -1) {
      url = `http://localhost:8080/comments?page=${page}&size=${commentsByPage}&sort=${sort}`;
    } else {
      url = `http://localhost:8080/persons/${personId}/comments`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (personId === -1) {
          setComments(data.content);
          setTotalComments(data.totalElements);
          setTotalPages(data.totalPages);
        } else {
          setComments(data);
          setTotalComments(data.length);
          setTotalPages(1);
        }
      });
  }, [personId, page, sort, commentsByPage]);

  function filterByPerson(id: number) {
    setPersonId(id);
    setPage(0); // alusta uuesti esimeselt lehelt
  }

  return (
    <div>
      <h2>Isikud</h2>

      {/* Isikute filtrinupud */}
      <div>
        <button onClick={() => filterByPerson(-1)}>Kõik</button>
        {persons.map((p) => (
          <button key={p.id} onClick={() => filterByPerson(p.id)}>
            {p.name}
          </button>
        ))}
      </div>
      <br />

      <div>Kokku kommentaare: {totalComments}</div>

      {/* Mitu kommentaari lehel */}
      {personId === -1 && (
        <select
          ref={commentsByPageRef}
          value={commentsByPage}
          onChange={() =>
            setCommentsByPage(Number(commentsByPageRef.current?.value))
          }
        >
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      )}

      {/* Sorteerimisnupud */}
      {personId === -1 && (
        <>
          <button onClick={() => setSort("name,asc")}>Sorteeri A–Z</button>
          <button onClick={() => setSort("name,desc")}>Sorteeri Z–A</button>
        </>
      )}

      {/* Kommentaaride loetelu */}
      {comments.map((comment) => (
        <div key={comment.id}>
          <strong>Pealkiri:</strong> {comment.name} <br />
          <em>Email:</em> {comment.email} <br />
          <span>{comment.body}</span>
          <hr />
        </div>
      ))}

      {/* Lehekülje navigeerimine */}
      {personId === -1 && (
        <div>
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>
            Eelmine
          </button>
          <span>
            {" "}
            Leht {page + 1} / {totalPages}{" "}
          </span>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Järgmine
          </button>
        </div>
      )}
    </div>
  );
}

export default Persons;
