import connection from "../db.js";

//index
const index = (req, res) => {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, result) => {
    if (result.length == 0) {
      res.status(404).json({
        error: "film non trovato",
      });
    } else {
      res.status(200).json({
        info: "Stampo i film",
        totalcount: result.length,
        data: result,
      });
    }
  });
};

//show postid

export default { index };
