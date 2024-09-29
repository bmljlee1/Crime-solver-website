import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const PORT = "8080";
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
console.log("Database URL:", process.env.DATABASE_URL);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
// chat gpt solution for crime cases join with theories not fetching (didnt work)
const corsOptions = {
  origin: ["http://localhost:5173", "https://week07-project-1.onrender.com"], // Replace with your frontend URLs
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//  fetch a single crime case by its ID
app.get("/crime-cases/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("SELECT * FROM crime_cases WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `No crime case found with ID: ${id}` });
    }

    res.status(200).json(result.rows[0]); // Send the single crime case as a response
  } catch (error) {
    res.status(500).json({ error: `${error.name}: ${error.message}` });
  }
});

app.get("/", (req, res) => {
  try {
    res
      .status(200)
      .send({ message: "You’re looking at my root route, how rude!" });
  } catch (error) {
    res.json(`${error.name}: ${error.message}`);
  }
});

//  fetch theories for a specific case
app.get("/theories/:caseName", async (req, res) => {
  const { caseName } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM theories WHERE crime_case = $1",
      [caseName]
    );

    if (result.rows.length === 0) {
      res
        .status(404)
        .json({ message: `No theories found for case: ${caseName}` });
    } else {
      res.status(200).json(result.rows);
    }
  } catch (error) {
    res.status(500).json({ error: `${error.name}: ${error.message}` });
  }
});

app.get("/theories", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM theories");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: `${error.name}: ${error.message}` });
  }
});

// add a new theory
app.post("/theories", async (req, res) => {
  const { title, content, author, crime_case } = req.body;

  // Validation to ensure required fields are present
  if (!title || !content || !author || !crime_case) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  try {
    const result = await db.query(
      `INSERT INTO theories (title, content, author, crime_case) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, content, author, crime_case]
    );

    // Returns the newly inserted theory
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json(`${error.name}: ${error.message}`);
  }
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: `${error.name}: ${error.message}` });
  }
});

//  increment likes
app.put("/theories/:id/like", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "UPDATE theories SET likes = likes + 1 WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Theory not found." });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: `${error.name}: ${error.message}` });
  }
});

//fetch all crime cases from the database
app.get("/crime-cases", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM crime_cases");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: `${error.name}: ${error.message}` });
  }
});

export const getAllCrimeCases = async () => {
  try {
    const response = await fetch(
      "https://week07-project-yykp.onrender.com/crime-cases"
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

// Join to fetch theories aswell as their related crime cases
app.get("/theories-with-cases", async (req, res) => {
  try {
    const query = `
      SELECT 
        theories.id AS theory_id,
        theories.title AS theory_title,
        theories.content,
        theories.author,
        theories.created_at,
        theories.likes,
        crime_cases.id AS case_id,
        crime_cases.title AS case_title
      FROM 
        theories
      JOIN 
        crime_cases ON theories.crime_case = crime_cases.id;
    `;

    const result = await db.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: `${error.name}: ${error.message}` });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port 8080.");
});
