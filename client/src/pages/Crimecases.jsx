import { useEffect, useState } from "react";
import { getAllCrimeCases } from "../api/ApiTheories";
import { Link } from "react-router-dom";

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
    <div>
      <h1>Crime Cases</h1>
      <ul>
        {crimeCases.map((crimeCase) => (
          <li key={crimeCase.id}>
            <Link to={`/crime-cases/${crimeCase.id}`}>{crimeCase.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
