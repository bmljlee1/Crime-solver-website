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

// Root route
app.get("/", (req, res) => {
  try {
    res
      .status(200)
      .send({ message: "You’re looking at my root route, how rude!" });
  } catch (error) {
    res.json(`${error.name}: ${error.message}`);
  }
});

// GET /theories/:caseName to fetch theories for a specific case
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
      res.status(200).json(result.rows); // Fixed typo (result instead of results)
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

// POST /theories to add a new theory
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

    // Return the newly inserted theory
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json(`${error.name}: ${error.message}`); // Send a meaningful error response
  }
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()"); // Simple query to check DB connection
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: `${error.name}: ${error.message}` });
  }
});

// PUT /theories/:id/like to increment likes
app.put("/theories/:id/like", async (req, res) => {
  const { id } = req.params;

  try {
    // Update the likes count by incrementing it
    const result = await db.query(
      "UPDATE theories SET likes = likes + 1 WHERE id = $1 RETURNING *",
      [id]
    );

    // Check if the theory exists
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Theory not found." });
    }

    // Return the updated theory with the new likes count
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: `${error.name}: ${error.message}` });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port 8080.");
});
