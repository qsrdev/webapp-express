import connection from "../db.js";

//index
const index = (req, res) => {
  res.status(200).json({
    info: "connession ok",
  });
};

//show postid

export default { index };
