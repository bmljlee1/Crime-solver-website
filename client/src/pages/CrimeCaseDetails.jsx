import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCrimeCaseById } from "../api/ApiTheories";
import "./CrimeCaseDetails.css";

export default function CrimeCaseDetails() {
  const { id } = useParams();
  const [crimeCase, setCrimeCase] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrimeCase = async () => {
      try {
        const data = await getCrimeCaseById(id);
        setCrimeCase(data);
      } catch (error) {
        console.error("Error fetching crime case", error);
        setError("Failed to fetch crime case.");
      }
    };
    fetchCrimeCase();
  }, [id]);

  if (error) return <p className="error-message">{error}</p>;
  if (!crimeCase) return <p className="loading">Loading...</p>;

  return (
    <div className="crime-case-details">
      <h1>{crimeCase.title}</h1>
      <p>
        <strong>Case Details:</strong> {crimeCase.details}
      </p>
      <p>
        <strong>Evidence:</strong> {crimeCase.evidence}
      </p>
    </div>
  );
}
