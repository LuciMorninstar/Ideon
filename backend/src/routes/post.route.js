import express from "express"
import { createPost, deletePost, getAllPosts, increaseClickCount, reactToPost, toggleBookmarks, updatePost } from "../controllers/post.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllPosts);
router.post("/", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.patch("/:id",protectRoute,updatePost);
router.patch("/incClickCount/:id", protectRoute, increaseClickCount );
router.patch("/react/:id", protectRoute, reactToPost);





export default router;