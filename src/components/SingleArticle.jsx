import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import {
  getArticle,
  patchVotes,
  getComments,
  postComment,
} from "../utils/api.js";
import { UserContext } from "../context/User";
import { Expandable } from "../components/Expandable";

const SingleArticle = () => {
  const [article, setArticle] = useState([]);
  const { article_id } = useParams();
  const [votesChange, setVotesChange] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    getArticle(article_id).then((articleFromApi) => {
      //console.log(articleFromApi);
      setArticle(articleFromApi);
    });
  }, [article_id]);

  const incVotes = () => {
    setVotesChange((currVotesChange) => {
      return currVotesChange + 1;
    });
    patchVotes(article_id).catch((err) => {
      setHasError(true);
      setVotesChange(0);
    });
  };

  useEffect(() => {
    getComments(article_id).then((commentsFromApi) => {
      //console.log(commentsFromApi);
      setComments(commentsFromApi);
    });
  }, [article_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    postComment(article_id, user, newComment)
      .then((comment) => {
        //console.log(comment);
        setSubmitSuccess(true);
        setComments((currComments) => {
          const newComments = [...currComments];
          newComments.unshift(comment);
          return newComments;
        });
      })
      .catch((err) => {
        setHasError(true);
      });
  };

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  return (
    <div className="Article">
      <ul>
        {article.map((article) => {
          return (
            <li key={article.article_id}>
              <h2>Article Id: {article.article_id}</h2>
              <h2>{article.title}</h2>
              <p>{article.body}</p>
              <h5>Author: {article.author}</h5>
              <h5>Votes: {article.votes + votesChange}</h5>
              {hasError && <p>Oops! Something's gone wrong!</p>}
              <button disabled={votesChange > 0} onClick={incVotes}>
                Like!
              </button>
            </li>
          );
        })}
      </ul>
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
            {hasError && <p>Oops! Something's gone wrong!</p>}
            {submitSuccess && <p>Comment submitted successfully!</p>}
          </form>
          <ul>
            {comments.map((comment) => {
              return (
                <li key={comment.comment_id}>
                  <p>{comment.body}</p>
                  <p>{comment.author}</p>
                  <p>{comment.created_at}</p>
                </li>
              );
            })}
          </ul>
        </Expandable>
      </div>
    </div>
  );
};

export default SingleArticle;
