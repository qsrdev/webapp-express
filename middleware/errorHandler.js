const errorHandler = (req, res, next) => {
  res.status(500).json({
    status: "500",
    info: "Non è possibile soddisfare la tua richiesta",
  });
};

export default errorHandler;
