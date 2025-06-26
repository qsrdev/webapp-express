const notFound = (req, res, next) => {
  res.status(404).json({
    status: "404",
    info: "L'elemento richiesto non è stato trovato",
  });
};

export default notFound;
