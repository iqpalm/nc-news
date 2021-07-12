import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../utils/api.js";

const Nav = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
  }, []);

  return (
    <nav className="Nav">
      {topics.map((topic) => {
        return (
          <Link to={`/articles/${topic.slug}`} key={topic.slug}>
            {topic.slug}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
