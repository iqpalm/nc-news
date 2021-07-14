import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import { UserContext } from "./context/User";

function App() {
  const [user, setUser] = useState("jessjelly");
  return (
    <UserContext.Provider value={{ user, setUser }}>
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
          <Route path="/">
            <p>Invalid path chosen...please check url address</p>
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
