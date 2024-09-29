import { useEffect, useState } from "react";
import { getAllCrimeCases, getTheoriesByCaseName } from "../api/ApiTheories";
import "./FilterTheoriesByCrimeCase.css";

export default function FilterTheoriesByCrimeCase() {
  const [crimeCases, setCrimeCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState("");
  const [theories, setTheories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrimeCases = async () => {
      try {
        const data = await getAllCrimeCases();
        console.log("Fetched Crime Cases:", data);
        setCrimeCases(data);
      } catch (error) {
        console.error("Error fetching crime cases", error);
        setError("Failed to fetch crime cases.");
      }
    };
    fetchCrimeCases();
  }, []);

  // Fetch theories when a crime case is selected
  useEffect(() => {
    if (selectedCase) {
      // Only fetcheso if a case is selected
      const fetchTheories = async () => {
        try {
          console.log("Selected Crime Case ID:", selectedCase);
          const data = await getTheoriesByCaseName(selectedCase);
          console.log("Fetched Theories for Crime Case:", data);
          setTheories(data);
        } catch (error) {
          console.error("Error fetching theories", error);
          setError("Failed to fetch theories for the selected crime case.");
        }
      };
      fetchTheories();
    }
  }, [selectedCase]);

  return (
    <div className="filter-container">
      <h1>Search Theories by Crime Case</h1>

      {error && <p className="error-message">{error}</p>}

      {/* DROPDOWN FOR CRIME_CASES */}
      {/* https://react.dev/reference/react-dom/components/select */}
      {/* https://upmostly.com/tutorials/react-onchange-events-with-examples */}
      {/* https://www.cluemediator.com/handle-the-onchange-event-on-a-select-element-in-react-with-hooks */}
      <select
        onChange={(e) => {
          setSelectedCase(e.target.value);
          console.log("User selected crime case:", e.target.value);
        }}
        value={selectedCase}
      >
        <option value="">Select a Crime Case</option>
        {crimeCases.map((crimeCase) => (
          <option key={crimeCase.id} value={crimeCase.id}>
            {crimeCase.title}
          </option>
        ))}
      </select>

      {selectedCase ? (
        <ul>
          {theories.length > 0 ? (
            theories.map((theory) => (
              <li key={theory.id}>
                <h3>{theory.title}</h3>
                <p>{theory.content}</p>
                <p>Username: {theory.author}</p>
                <p>Likes: {theory.likes}</p>
              </li>
            ))
          ) : (
            <p className="no-theories-message">
              No theories found for this crime case.
            </p>
          )}
        </ul>
      ) : (
        <p className="no-theories-message">
          Please select a crime case to view the theories
        </p>
      )}
    </div>
  );
}
