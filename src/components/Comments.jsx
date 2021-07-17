import { useState, useContext } from "react";
import { Expandable } from "../components/Expandable";
import { postComment } from "../utils/api.js";
import { UserContext } from "../context/User";
import { sortComments } from "../utils/utils";
import useComments from "../Hooks/useComments.js";

const Comments = ({ article_id }) => {
  const { user } = useContext(UserContext);
  const { comments, setComments } = useComments(article_id);
  const [newComment, setNewComment] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hasCommentError, setHasCommentError] = useState(false);

  const sortedComments = sortComments(comments);

  const handleSubmit = (event) => {
    event.preventDefault();
    postComment(article_id, user, newComment)
      .then((comment) => {
        setSubmitSuccess(true);
        setComments((currComments) => {
          const newComments = [comment, ...currComments];
          return newComments;
        });
      })
      .catch((err) => {
        setHasCommentError(true);
      });
  };

  const handleChange = (event) => {
    setHasCommentError(false);
    setSubmitSuccess(false);
    setNewComment(event.target.value);
  };
  return (
    <div className="Comments">
      <ul>Comments</ul>
      <Expandable>
        <h5>Add comment</h5>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">
              username:
              <input id="username" name="username" value={user} readOnly />
            </label>
          </div>
          <div>
            <label htmlFor="body">
              comment:
              <input
                onChange={handleChange}
                id="body"
                name="body"
                type="text"
                placeholder="comment"
              />
            </label>
          </div>
          <button>submit</button>
          {hasCommentError && <p>Oops! Something's gone wrong!</p>}
          {submitSuccess && <p>Comment submitted successfully!</p>}
        </form>
        <ul>
          {sortedComments.map((comment) => {
            return (
              <li id="comments" key={comment.comment_id}>
                <p>{comment.body}</p>
                <p>{comment.author}</p>
                <p>{comment.new_created_at}</p>
                <p>----------------------</p>
              </li>
            );
          })}
        </ul>
      </Expandable>
    </div>
  );
};

export default Comments;
