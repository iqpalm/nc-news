import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getArticle } from "../utils/api.js";
import { Link } from "react-router-dom";

const SingleArticle = () => {
  const [article, setArticle] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    getArticle(article_id).then((articleFromApi) => {
      console.log(articleFromApi);
      setArticle(articleFromApi);
    });
  }, [article_id]);

  return (
    <div className="Article">
      <ul>
        {article.map((article) => {
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

export default SingleArticle;
