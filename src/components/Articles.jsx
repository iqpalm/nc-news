import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useArticles from "../Hooks/useArticles.js";

const Articles = () => {
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const { topic } = useParams();
  const { articles, isLoading, hasError, errorMessage } = useArticles(
    topic,
    sort,
    order
  );

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const handleOrder = (event) => {
    setOrder(event.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  if (hasError) return <p>Invalid path chosen...{errorMessage}</p>;

  return (
    <div className="Articles">
      <h2 id="topic">{topic} articles</h2>
      <label htmlFor="sort_by">
        Sort_by:
        <select id="sort_by" value={sort} onChange={handleChange}>
          <option value="created_at">Date created</option>
          <option value="comment_count">No of comments</option>
          <option value="votes">No of votes</option>
        </select>
      </label>
      <label htmlFor="order">
        Order:
        <select id="order" value={order} onChange={handleOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <Link
                to={`/article/${article.article_id}`}
                key={article.article_id}
              >
                <h3>{article.title}</h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Articles;
