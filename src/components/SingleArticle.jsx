import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getArticle } from "../utils/api.js";

const SingleArticle = () => {
  const [article, setArticle] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    getArticle(article_id).then((articleFromApi) => {
      console.log(articleFromApi);
      setArticle(articleFromApi);
    });
  });
  return (
    <div className="Article">
      <h1>Hello...{article.title}</h1>
    </div>
  );
};

export default SingleArticle;
