import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { deleteAllMySavedPosts, deleteSingleSavedPost, getAllMySavedPosts, addToSavedPosts } from "../controllers/savedPosts.controller.js";


const router = express.Router();

router.post("/:id", protectRoute, addToSavedPosts)
router.get("/", protectRoute, getAllMySavedPosts);
router.delete("/", protectRoute, deleteAllMySavedPosts);
router.delete("/:id", protectRoute, deleteSingleSavedPost);



export default router;