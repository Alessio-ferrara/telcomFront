import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import authService from "./services/authService";
import 'semantic-ui-css/semantic.min.css';

import Login from "./auth/pages/Login";
import NavBar from "./shared/components/NavBar";
import Footer from "./shared/components/Footer";
import LandingPage from "./shared/components/LandingPage";



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
        {/* we route to the Login.jsx in auth/pages */}
        <Route path="/login" element={<Login/>}/>
      </Routes>
    );
    routes = (
      <Routes>
        {/* we route to the Login.jsx in auth/pages */}
        <Route path="/" element={<Login/>}/>
      </Routes>
    );
  }
  return (
    <Router>
      <NavBar/>
      <main>{routes}
      {/* <LandingPage/> */}
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
