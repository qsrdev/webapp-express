import connection from "../db.js";
import slugify from "slugify";

//index
const index = (req, res, next) => {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, result) => {
    if (err) {
      return next(new Error(err));
    }

    const movies = result.map((curMoovie) => {
      console.log(curMoovie);

      return {
        ...curMoovie,
        image: `${req.imagePath}/${curMoovie.image}`,
      };
    });

    res.status(200).json({
      info: "Stampo i film",
      totalcount: result.length,
      data: movies,
    });
  });
};

//show postid con doppia richiesta sql
const show = (req, res) => {
  const slug = req.params.slug;

  const movieRequest = `SELECT movies.*
                        FROM movies
                        WHERE movies.slug = ?`;

  const reviewRequest = `SELECT *
                        FROM reviews
                        WHERE reviews.movie_id = ?`;

  connection.query(movieRequest, [slug], (err, movieResult) => {
    if (err) {
      return res.status(500).json({
        status: "500",
        info: "Non è possibile soddisfare la tua richiesta",
      });
    } else {
      const movieData = movieResult[0];
      connection.query(reviewRequest, [movieData.id], (err, reviewResult) => {
        console.log(`stampo il film numero ${movieData.id}}`);
        res.status(200).json({
          data: {
            ...movieData,
            image: `${req.imagePath}/${movieData.image}`,
            reviews: reviewResult,
          },
        });
      });
    }
  });
};

//store della recensione
const storeReview = (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  const movieRequest = `SELECT *
                      FROM movies
                      WHERE movies.id = ?`;

  connection.query(movieRequest, [id], (err, results) => {
    if (results.length === 0) {
      return res.status(404).json({
        error: "Movie not found",
      });
    }

    const { name, vote, text } = req.body;
    console.log(req.body);

    const newReviewSql = `INSERT INTO reviews (movie_id, name, vote, text)
                          VALUES (?, ?, ?, ?)`;

    connection.query(newReviewSql, [id, name, vote, text], (err, results) => {
      if (err) {
        return next(new Error(err));
      }
      return res.status(201).json({
        message: "Review created",
        id: results.insertId,
      });
    });
  });
};

export default { index, show };
