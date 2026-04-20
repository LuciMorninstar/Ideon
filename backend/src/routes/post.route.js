import express from "express"
import { createPost, deletePost, increaseClickCount, updatePost } from "../controllers/post.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.patch("/:id",protectRoute,updatePost);
router.patch("/incClickCount/:id", protectRoute, increaseClickCount );




export default router;