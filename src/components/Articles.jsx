import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getArticles } from "../utils/api.js";
import { Link } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [sort, setSort] = useState("date_created");
  const { topic } = useParams();

  useEffect(() => {
    getArticles(topic).then((articlesFromApi) => {
      setArticles(articlesFromApi);
    });
  }, [topic]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setSort(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="Articles">
      <h2>{topic} Articles</h2>
      <label htmlFor="sort_by">
        Sort_by:
        <select value={sort} onChange={handleChange}>
          <option value="date_created">Date created</option>
          <option value="comment_count">No of comments</option>
          <option value="votes">No of votes</option>
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
