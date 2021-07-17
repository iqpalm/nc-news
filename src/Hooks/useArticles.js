import { useState, useEffect } from "react";
import { getArticles } from "../utils/api";

const useArticles = (topic, sort, order) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
    getArticles(topic, sort, order)
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.msg);
        setHasError(true);
        setIsLoading(false);
      });
  }, [topic, sort, order]);
  return {
    articles,
    isLoading,
    hasError,
    errorMessage,
  };
};

export default useArticles;
