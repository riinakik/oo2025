import { useEffect, useState } from "react";
import { Comment as CommentType } from "../models/Comment"; // väldi nimekonflikti
import { useParams } from "react-router-dom";

function Comment() {
  const { id } = useParams();
  const [comment, setComment] = useState<CommentType>();

  useEffect(() => {
    fetch("http://localhost:8080/comments/" + id)
      .then((res) => res.json())
      .then((json) => setComment(json));
  }, [id]);

  if (!comment) {
    return <div>No comments!...</div>;
  }

  return (
    <div>
      <h2>{comment.name}</h2>
      <p>{comment.postId}</p>
      <div>{comment.email}</div>
      <p>{comment.body}</p>
    </div>
  );
}

export default Comment;
