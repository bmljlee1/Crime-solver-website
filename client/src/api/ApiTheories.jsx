const API_URL = "https://week07-project-1.onrender.com/theories";

export const getAllTheories = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch theories");
  return response.json();
};

export const addNewTheory = async (theory) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(theory),
  });
  if (!response.ok) throw new Error("Failed to add theory");
  return response.json();
};

export const incrementLikes = async (id) => {
  const response = await fetch(`${API_URL}/${id}/like`, { method: "PUT" });
  if (!response.ok) throw new Error("Failed to like theory");
  return response.json();
};

export const getTheoriesWithCases = async () => {
  try {
    const response = await fetch(
      "https://week07-project-1.onrender.com/theories-with-cases"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch theories with cases");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching theories with cases", error);
    throw error;
  }
};

export const getAllCrimeCases = async () => {
  try {
    const response = await fetch(
      "https://week07-project-1.onrender.com/crime-cases"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch crime cases");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching crime cases", error);
    throw error;
  }
};

export const getTheoriesByCaseName = async (caseName) => {
  try {
    const response = await fetch(`${API_URL}/${caseName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch theories for case: ${caseName}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching theories for crime case", error);
    throw error;
  }
};

export const getCrimeCaseById = async (id) => {
  try {
    const response = await fetch(
      `https://week07-project-1.onrender.com/crime-cases/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch crime case");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching crime case", error);
    throw error;
  }
};
