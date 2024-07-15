import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: "America/Sao_Paulo",
});

db.connect((err: Error) => {
  if (err) {
    console.error(`❌[database]: Error connecting to the database: `, err);
  } else {
    console.log(`✅[database]: Connected to the database!`);
  }
});

export default db;
