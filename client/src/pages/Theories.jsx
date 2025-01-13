import { useEffect, useState } from "react";
import { getTheoriesWithCases, incrementLikes } from "../api/ApiTheories";
import "./Theories.css";

export default function Theories() {
  const [theories, setTheories] = useState([]);
  const [toggleUpdate, setToggleUpdate] = useState(false);

  useEffect(() => {
    const fetchTheories = async () => {
      try {
        const data = await getTheoriesWithCases();
        setTheories(data);
      } catch (error) {
        console.error("Error fetching theories with crime cases", error);
      }
    };
    fetchTheories();
  }, [toggleUpdate]);

  const handleLike = async (id) => {
    try {
      await incrementLikes(id);
      setToggleUpdate((prev) => !prev);
    } catch (error) {
      console.error("Error liking theory", error);
    }
  };

  return (
    <div className="theories-container">
      <h3>Theories with Crime Cases</h3>
      <ul className="theories-list">
        {theories
          .sort((a, b) => a.theory_id - b.theory_id)
          .map((theory) => (
            // <Theory key={theory.theory_id} theory={theory} />

            <li key={theory.theory_id}>
              <h3>{theory.theory_title}</h3>
              <p>{theory.content}</p>
              <p className="theory-meta">Author: {theory.author}</p>
              <p className="theory-meta">Crime Case: {theory.case_title}</p>
              <p className="theory-likes">Likes: {theory.likes}</p>
              <button onClick={() => handleLike(theory.theory_id)}>Like</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

////// Theory Component

// export function Theory({ theory }) {
//   return (
//     <li key={theory.theory_id}>
//       <h3>{theory.theory_title}</h3>
//       <p>{theory.content}</p>
//       <p className="theory-meta">Author: {theory.author}</p>
//       <p className="theory-meta">Crime Case: {theory.case_title}</p>
//       <p className="theory-likes">Likes: {theory.likes}</p>
//       <button onClick={() => handleLike(theory.theory_id)}>Like</button>
//     </li>
//   );
// }
