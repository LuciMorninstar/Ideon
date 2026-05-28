import express from "express"
import { createPost, deletePost, getAllPosts, getBookmarks, getPostsByUserId, increaseClickCount, reactToPost, toggleBookmarks, updatePost } from "../controllers/post.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllPosts);
router.get("/:id", protectRoute, getPostsByUserId);
router.get("/bookmarks", protectRoute, getBookmarks);
router.post("/", protectRoute, upload.fields([{name:"images", maxCount:8},{name:"video", maxCount:1}]), createPost);
router.delete("/:id", protectRoute, deletePost);
router.patch("/:id",protectRoute,updatePost);
router.patch("/incClickCount/:id", protectRoute, increaseClickCount );
router.patch("/react/:id", protectRoute, reactToPost);
router.patch("/toggleBookmarks/:postId", protectRoute, toggleBookmarks);








export default router;