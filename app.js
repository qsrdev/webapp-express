import express from "express";
import moovieRouter from "./routers/moovie.js";

const app = express();
const port = 3000;

//body parser per le richieste del db
app.use(express.json());

//routes
app.use("/moovies", moovieRouter);

app.listen(port, () => {
  console.log(`Il server è in ascolto sulla porta ${port}`);
});
