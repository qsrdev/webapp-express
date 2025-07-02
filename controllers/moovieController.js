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
      return res.status(404).json({
        status: "404",
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

const validateRequest = (req) => {
  const { title, director, abstract } = req.body;
  if (!title || !director) {
    return false;
  }
  if (title.length < 4 || director.length < 4 || abstract.length < 20) {
    return false;
  }
};

const store = (req, res, next) => {
  if (!validateRequest(req)) {
    return res.status(400).json({
      error: "Wrong Data",
    });
  }
  console.log(validateRequest(req));

  //prelevo i dati dal body del form
  const { title, director, abstract } = req.body;

  const image = req.file.filename;

  //ho installato un programma chiamato slugify che permette di convertire i titoli dei libri del form al formato corretto
  //in questo caso metterà tutto in minuscolo e leverà gli spazi mettendo dei trattini
  const slug = slugify(title, {
    lower: true,
    strinct: true,
  });

  const newBookSql = `INSERT INTO books (slug, title, director, abstract, image)
               VALUES (?, ?, ?, ?, ?)`;

  // Eseguiamo la query
  connection.query(newBookSql, [slug, title, director, abstract, image], (err, results) => {
    //  Se c'è errore lo giestiamo
    if (err) {
      return next(new Error(err));
    }
    //  Invio la risposta con il codie 201 e id e slug
    return res.status(201).json({
      id: results.insertId,
      slug,
    });
  });
};

//store della recensione
const storeReview = (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  const movieRequest = `SELECT *
                      FROM movies
                      WHERE id = ?`;

  connection.query(movieRequest, [id], (err, movieResult) => {
    if (movieResult.length === 0) {
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

export default { index, show, storeReview };
