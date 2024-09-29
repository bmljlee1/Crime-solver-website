// I could not get the likes to re-render no matter how hard i tried =( I ended up adding toggleUpdate....

// import { useEffect, useState } from "react";
// import { getTheoriesWithCases, incrementLikes } from "../api/ApiTheories"; // Import the new API function

// export default function Theories() {
//   const [theories, setTheories] = useState([]);

//   // Fetch theories with associated crime cases on component mount
//   useEffect(() => {
//     const fetchTheories = async () => {
//       try {
//         const data = await getTheoriesWithCases();
//         console.log("Fetched Theories Data:", data); // Log the entire fetched data
//         data.forEach((theory) => {
//           console.log("Theory ID:", theory.theory_id); // Log each theory's theory_id
//         });
//         setTheories(data);
//       } catch (error) {
//         console.error("Error fetching theories with crime cases", error);
//       }
//     };
//     fetchTheories();
//   }, []);

//   // Handle liking a theory
//   const handleLike = async (id) => {
//     console.log("Liking theory with ID:", id); // Log the ID being liked
//     try {
//       const updatedTheory = await incrementLikes(id);
//       console.log("Updated Theory Response from Backend:", updatedTheory); // Log the updated theory

//       // Update the state to reflect the new likes immediately
//       setTheories((prevTheories) => {
//         const newTheories = prevTheories.map((theory) =>
//           theory.theory_id === updatedTheory.theory_id
//             ? { ...theory, likes: updatedTheory.likes } // Ensure likes is updated
//             : theory
//         );
//         return [...newTheories]; // Force a new array reference to trigger re-render
//       });
//     } catch (error) {
//       console.error("Error liking theory", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Theories with Crime Cases</h1>
//       <ul>
//         {theories.map((theory) => {
//           console.log("Rendering theory:", theory); // Keep this to log each theory
//           return (
//             <li key={theory.theory_id}>
//               {" "}
//               {/* Use theory.theory_id here */}
//               <h3>{theory.theory_title}</h3>
//               <p>{theory.content}</p>
//               <p>Author: {theory.author}</p>
//               <p>Crime Case: {theory.case_title}</p>
//               <p>Likes: {theory.likes}</p>
//               <button onClick={() => handleLike(theory.theory_id)}>
//                 Like
//               </button>{" "}
//               {/* Use theory.theory_id here */}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

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
