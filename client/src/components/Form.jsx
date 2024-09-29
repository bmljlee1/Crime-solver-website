import { useState, useEffect } from "react";
import { addNewTheory } from "../api/ApiTheories";
import { getAllCrimeCases } from "../api/ApiTheories";
import "./Form.css";

export default function Form() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    crime_case: "",
  });

  const [cases, setCases] = useState([]);

  // Fetch the crime cases when the component loads
  useEffect(() => {
    const fetchCrimeCases = async () => {
      try {
        const data = await getAllCrimeCases();
        setCases(data);
      } catch (error) {
        console.error("Error fetching crime cases", error);
      }
    };
    fetchCrimeCases();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewTheory(formData);
      setFormData({ title: "", content: "", author: "", crime_case: "" });
    } catch (error) {
      console.error("Error adding theory", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Theory Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Case:&nbsp;
        <select
          name="crime_case"
          value={formData.crime_case}
          onChange={handleChange}
          required
        >
          <option value="">Select a Case</option>
          {cases.map((crimeCase) => (
            <option key={crimeCase.id} value={crimeCase.id}>
              {crimeCase.title}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Submit Theory</button>
    </form>
  );
}
