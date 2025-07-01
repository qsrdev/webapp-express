import express from "express";
import moovieController from "../controllers/moovieController.js";

const router = express.Router();

//index
router.get("/", moovieController.index);
//show
router.get("/:slug", moovieController.show);
//post recensione
// router.post("/", moovieController.store)

export default router;
