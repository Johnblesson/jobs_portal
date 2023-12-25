import express from "express";
import { getJobs } from "../controllers/jobsController.js";
// import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getJobs);

/* UPDATE */
// router.patch("/:id/like", verifyToken, likePost);

export default router;
