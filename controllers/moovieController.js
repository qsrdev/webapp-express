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
      const movies = result.map((curMoovie) => {
        console.log(curMoovie);

        return {
          ...curMoovie,
          image: `${req.imagePath}/${curMoovie.title}`,
        };
      });

      res.status(200).json({
        info: "Stampo i film",
        totalcount: result.length,
        data: movies,
      });
    }
  });
};

//show postid con doppia richiesta sql
const show = (req, res) => {
  const id = req.params.id;

  const movieRequest = `SELECT movies.*
                        FROM movies
                        WHERE movies.id = ?`;

  const reviewRequest = `SELECT *
                        FROM reviews
                        WHERE reviews.movie_id = ?`;

  connection.query(movieRequest, [id], (err, movieResult) => {
    if (err) {
      console.log(err);
    } else {
      connection.query(reviewRequest, [id], (err, reviewResult) => {
        console.log(`stampo il film numero ${id}`);
        res.status(200).json({
          data: {
            ...movieResult[0],
            reviews: reviewResult,
          },
        });
      });
    }
  });
};

export default { index, show };
