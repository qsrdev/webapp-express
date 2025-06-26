import mysql from "mysql2";
import chalk from "chalk";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "moovie_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connessione al database dei film avvenuta con successo");
});

export default connection;
