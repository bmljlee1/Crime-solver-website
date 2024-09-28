import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCrimeCaseById } from "../api/ApiTheories";

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

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!crimeCase) return <p>Loading...</p>;

  return (
    <div>
      <h1>{crimeCase.title}</h1>
      <p>
        <strong>Case Details:</strong>
        {crimeCase.details}
      </p>
      <p>
        <strong>Evidence:</strong>
        {crimeCase.evidence}
      </p>
    </div>
  );
}
