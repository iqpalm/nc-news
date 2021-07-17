import { useState, useEffect } from "react";
import { getArticle } from "../utils/api";

const useArticle = (article_id) => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
    getArticle(article_id)
      .then((articleFromApi) => {
        setArticle(articleFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.msg);
        setHasError(true);
        setIsLoading(false);
      });
  }, [article_id]);
  return { article, isLoading, hasError, errorMessage };
};

export default useArticle;
