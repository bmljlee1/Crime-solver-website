import { useState } from "react";
import { addNewTheory } from "../api/ApiTheories";

export default function Form() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    crime_case: "",
  });

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
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Content:
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Crime Case:
        <input
          type="text"
          name="crime_case"
          value={formData.crime_case}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Submit Theory</button>
    </form>
  );
}
