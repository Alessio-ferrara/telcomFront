import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import authService from "./services/authService";

import Login from "./auth/pages/Login";
import NavBar from "./shared/components/NavBar";

function App() {
  const user = authService.getCurrentRuolo();

  let routes;

  if (user) {
    if (user === "User") {
      routes = (
        <Routes>
          <Route path="/"></Route>
        </Routes>
      );
    } else {
      routes = (
        <Routes>
          <Route path="/"></Route>
        </Routes>
      );
    }
  } else {
    routes = (
      <Routes>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    );
  }
  console.log(routes)
  return (
    <Router>
      <NavBar/>
      <main>{routes}</main>
    </Router>
  );
}

export default App;
