import express from "express";

const app = express();
const port = 3000;

//body parser per le richieste del db
app.use(express.json());

app.listen(port, () => {
  console.log(`Il server è in ascolto sulla porta ${port}`);
});
