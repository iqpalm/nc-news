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
import { sortComments } from "../utils/utils";

const SingleArticle = () => {
  const { user } = useContext(UserContext);
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [votesChange, setVotesChange] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasCommentError, setHasCommentError] = useState(false);
  const [hasVoteError, setHasVoteError] = useState(false);

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
    getArticle(article_id)
      .then((articleFromApi) => {
        //console.log(articleFromApi);
        setArticle(articleFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        //console.log(err.response.data.msg);
        setErrorMessage(err.response.data.msg);
        setHasError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  const incVotes = () => {
    setVotesChange((currVotesChange) => {
      return currVotesChange + 1;
    });
    patchVotes(article_id).catch((err) => {
      setHasVoteError(true);
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

  const sortedComments = sortComments(comments);

  if (isLoading) return <p>Loading...</p>;
  if (hasError) return <p>Invalid path chosen...{errorMessage}</p>;
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
              {hasVoteError && <p>Oops! Something's gone wrong!</p>}
              <button
                id="article__vote_button"
                disabled={votesChange > 0}
                onClick={incVotes}
              >
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
    </div>
  );
};

export default SingleArticle;
