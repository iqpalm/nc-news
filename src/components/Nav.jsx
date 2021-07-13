import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../utils/api.js";
import { UserContext } from "../context/User.js";

const Nav = () => {
  const [topics, setTopics] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
  }, []);

  return (
    <nav className="Nav">
      <div>
        {topics.map((topic) => {
          return (
            <Link to={`/articles/${topic.slug}`} key={topic.slug}>
              {topic.slug}
            </Link>
          );
        })}
      </div>
      <h3>User: {user}</h3>
    </nav>
  );
};

export default Nav;
