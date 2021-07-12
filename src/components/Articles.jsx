import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getArticles } from "../utils/api.js";
import { Link } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();

  useEffect(() => {
    getArticles(topic).then((articlesFromApi) => {
      setArticles(articlesFromApi);
    });
  }, [topic]);

  return (
    <div className="Articles">
      <h2>{topic} Articles</h2>
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
