import mysql from "mysql2";
import chalk from "chalk";

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connessione al database dei film avvenuta con successo");
});

export default connection;
