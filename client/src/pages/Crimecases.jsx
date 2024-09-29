import { useEffect, useState } from "react";
import { getAllCrimeCases } from "../api/ApiTheories";
import { Link } from "react-router-dom";
import "./Crimecases.css";

export default function CrimeCases() {
  const [crimeCases, setCrimeCases] = useState([]);

  useEffect(() => {
    const fetchCrimeCases = async () => {
      try {
        const data = await getAllCrimeCases();
        setCrimeCases(data);
      } catch (error) {
        console.error("Error fetching crime cases", error);
      }
    };
    fetchCrimeCases();
  }, []);

  return (
    <div className="container">
      <h1>Crime Cases</h1>
      <ul className="crime-cases-list">
        {crimeCases.map((crimeCase) => (
          <li key={crimeCase.id}>
            <Link to={`/crime-cases/${crimeCase.id}`} className="crime-link">
              {crimeCase.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
