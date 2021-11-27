import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Redirect,
} from "react-router-dom";
import authService from "./services/authService";
import "semantic-ui-css/semantic.min.css";

import NavBar from "./shared/components/NavBar";
import Footer from "./shared/components/Footer";
import Login from "./auth/pages/Login";
import LandingPage from "./homepage/pages/LandingPage";
import PackagePage from "./pkgs/pages/PackagePage";
import ConfirmationPage from "./pkgs/pages/ConfirmationPage";
import HomePageEmp from "./employee/homepage/pages/HomePageEmp";
import LoginAdministrator from "./auth/pages/LoginAdministrator";
import UnpaidOrders from "./orders/pages/UnpaidOrders.jsx";
import Registration from "./auth/pages/Registration";
import Optionals from "./employee/optionals/pages/Optionals";
function App() {
  const user = authService.getCurrentRuolo();

  let routes;

  if (user) {
    if (user === "User") {
      routes = (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/packagedetails/:pkgID" element={<PackagePage />} />
          <Route path="/confirmationpage" element={<ConfirmationPage />} />
          <Route path="/unpaidorders" element={<UnpaidOrders />} />
        </Routes>
      );
    } else {
      routes = (
        <Routes>
          <Route path="/" element={<HomePageEmp />} />
          <Route path="/optionals" element={<Optionals />} />
        </Routes>
      );
    }
  } else {
    routes = (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/loginadministrator" element={<LoginAdministrator />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/packagedetails/:pkgID" element={<PackagePage />} />
        <Route path="/confirmationpage" element={<ConfirmationPage />} />
        {/* DEFAULT RENDERING TO THE LANDING PAGE IF WE ACCESS TO A FORBIDDEN */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    );
  }
  return (
    <Router>
      <NavBar />
      <main>{routes}</main>
      <Footer />
    </Router>
  );
}

export default App;
