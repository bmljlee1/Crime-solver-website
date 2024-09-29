import "./App.css";
import "./styles/GeneralLayout.css";
import { Routes, Route } from "react-router-dom";
import Theories from "./pages/Theories";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import FilterTheoriesByCrimeCase from "./components/FilterTheoriesByCrimeCase";
import Crimecases from "./pages/Crimecases";
import CrimeCaseDetails from "./pages/CrimeCaseDetails";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div>
      <h2 id="mainTitle">The Speculation Station</h2>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/theories" element={<Theories />} />
        <Route path="/form" element={<Form />} />
        <Route
          path="/filter-theories"
          element={<FilterTheoriesByCrimeCase />}
        />
        <Route path="/crime-cases" element={<Crimecases />} />
        <Route path="/crime-cases/:id" element={<CrimeCaseDetails />} />
      </Routes>
    </div>
  );
}
