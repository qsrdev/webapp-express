import express from "express";
import moovieController from "../controllers/moovieController.js";

const router = express.Router();

//index
router.get("/", moovieController.index);
//show
router.get("/:id", moovieController.show);

export default router;
