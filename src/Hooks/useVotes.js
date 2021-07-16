import { useState } from "react";
import { patchVotes } from "../utils/api";

const useVotes = (article_id) => {
  const [votesChange, setVotesChange] = useState(0);
  const [hasVoteError, setHasVoteError] = useState(false);
  const incVotes = () => {
    setVotesChange((currVotesChange) => {
      return currVotesChange + 1;
    });
    patchVotes(article_id).catch((err) => {
      setHasVoteError(true);
      setVotesChange(0);
    });
  };
  return { votesChange, incVotes, hasVoteError };
};

export default useVotes;
