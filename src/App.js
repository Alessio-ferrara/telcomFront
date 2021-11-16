import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import authService from "./services/authService";
import 'semantic-ui-css/semantic.min.css';

import NavBar from "./shared/components/NavBar";
import Footer from "./shared/components/Footer";
import Login from "./auth/pages/Login";
import LandingPage from "./homepage/pages/LandingPage";
import PackagePage from "./pkgs/pages/PackagePage";




function App() {
  const user = authService.getCurrentRuolo();

  let routes;

  if (user) {
    if (user === "User") {
      routes = (
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
        </Routes>
      );
    } else {
      routes = (
        <Routes>

        </Routes>
      );
    }
  } else {
    routes = (
      <Routes>
        {/* we route to the Login.jsx in auth/pages */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/packagedetails/:pkgID" element={<PackagePage/>}></Route>

      </Routes>
    );
  }
  return (
    <Router>
      <NavBar/>
      <main>{routes}
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
