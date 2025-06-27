import express from "express";
import moovieRouter from "./routers/moovie.js";
import notFound from "./middleware/notFound404.js";
import errorHandler from "./middleware/errorHandler.js";
import imagePath from "./middleware/imagePath.js";
import cors from "cors";

const app = express();
const port = process.env.SERVER_PORT;

app.use(
  cors({
    origin: process.env.SITE_URL,
  })
);

//body parser per le richieste del db
app.use(express.json());
//impostazione della cartella pubblica per far si che le immagini siano fruibili ovunque
app.use(express.static("public"));

//routes
app.use("/movies", imagePath, moovieRouter);

//404
app.use(notFound);

//500 errore generico
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Il server è in ascolto sulla porta ${port}`);
});
