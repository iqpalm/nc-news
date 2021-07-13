import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Switch>
        <Route exact path="/">
          <Articles />
        </Route>
        <Route exact path="/articles/:topic">
          <Articles />
        </Route>
        <Route exact path="/article/:article_id">
          <SingleArticle />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
