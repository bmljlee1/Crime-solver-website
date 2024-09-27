import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

async function makeTable() {
  await db.query("DROP TABLE IF EXISTS theories");
  await db.query(`CREATE TABLE theories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    crime_case TEXT,
    title TEXT,
    content TEXT,
    author TEXT,
    created_at TIMESTAMP,
    likes INTEGER DEFAULT 0
  );`);

  await db.query(`
    INSERT INTO theories (crime_case, title, content, author, created_at, likes) 
    VALUES 
    ('The Great Cookie Heist of 2021', 'Blame the Cookie Monster', 'The missing cookies were clearly devoured by the Cookie Monster. No one else could eat 500 cookies in under 5 minutes.', 'DetectiveSnacks', NOW(), 7),
    ('The Mystery of the Vanishing Left Socks', 'Parallel Sock Universe Theory', 'Every left sock that disappears in the dryer is actually transported to a parallel universe where left socks are considered currency.', 'LaundryExpert42', NOW(), 15)
  `);

  console.log("successfully seeded");
}

makeTable();
