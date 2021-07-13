import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getArticle, patchVotes, getComments } from "../utils/api.js";

const SingleArticle = () => {
  const [article, setArticle] = useState([]);
  const { article_id } = useParams();
  const [votesChange, setVotesChange] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [comments, setComments] = useState([]);

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
          <form>
            <div>
              <label htmlFor="username">
                username:
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
                />
              </label>
            </div>
            <div>
              <label htmlFor="body">
                comment:
                <input
                  id="body"
                  name="body"
                  type="text"
                  placeholder="comment"
                />
              </label>
            </div>
            <button>submit</button>
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

const Expandable = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen((currOpen) => !currOpen);
  };
  return (
    <div>
      <button onClick={toggleIsOpen}>{isOpen ? "Close" : "Open"}</button>
      {isOpen && children}
    </div>
  );
};

export default SingleArticle;
