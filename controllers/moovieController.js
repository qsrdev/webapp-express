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
const show = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM movies WHERE id = ?;";

  connection.query(sql, [id], (err, result) => {
    if (result.length == 0) {
      res.status(404).json({
        error: "film non trovato",
      });
    } else {
      console.log(`stampo il film con id ${id}`);
      res.status(200).json({
        data: result[0],
      });
    }
  });
};

export default { index, show };
