import { useParams } from "react-router";
import useArticle from "../Hooks/useArticle.js";
import useVotes from "../Hooks/useVotes";
import Comments from "./Comments";

const SingleArticle = () => {
  const { article_id } = useParams();
  const { article, isLoading, hasError, errorMessage } = useArticle(article_id);
  const { votesChange, incVotes, hasVoteError } = useVotes(article_id);

  if (isLoading) return <p>Loading...</p>;
  if (hasError) return <p>Invalid path chosen...{errorMessage}</p>;
  return (
    <div className="Article">
      <ul>
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
      </ul>
      <Comments article_id={article_id} />
    </div>
  );
};

export default SingleArticle;
