import logo from "./logo.svg";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
function App() {
  const user = authService.getCurrentRuolo();

  let routes;

  if (user) {
    if (user === "User") {
      routes = (
        <Switch>
          <Route path="/" exact></Route>
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/" exact></Route>
          <Redirect to="/" />
        </Switch>
      );
    }
  } else {
    routes = (
      <Switch>
        <Route path="/login" exact></Route>
        <Redirect to="/login" />
      </Switch>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
