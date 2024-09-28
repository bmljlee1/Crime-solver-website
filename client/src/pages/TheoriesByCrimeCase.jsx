import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTheoriesByCaseName } from "../api/ApiTheories";

export default function TheoriesByCrimeCase() {
  const { caseId } = useParams();
  const [theories, setTheories] = useState([]);

  useEffect(() => {
    const fetchTheories = async () => {
      try {
        const data = await getTheoriesByCaseName(caseId);
        setTheories(data);
      } catch (error) {
        console.error("Error fetching theories for the case", error);
      }
    };
    fetchTheories();
  }, [caseId]);

  return (
    <div>
      <h1>Theories for Crime Case</h1>
      <ul>
        {theories.map((theory) => (
          <li key={theory.id}>
            <h3>{theory.title}</h3>
            <p>{theory.content}</p>
            <p>Author: {theory.author}</p>
            <p>Likes: {theory.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
