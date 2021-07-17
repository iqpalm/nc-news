import { useState, useEffect } from "react";
import { getComments } from "../utils/api";

const useComments = (article_id) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments(article_id).then((commentsFromApi) => {
      setComments(commentsFromApi);
    });
  }, [article_id]);
  return { comments, setComments };
};

export default useComments;
