import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { createStory, deleteStory, updateStory, showFriendStories, showAllStories, getStoryById } from "../controllers/story.controller.js";
import upload from "../middlewares/multer.middleware.js";


const router = express.Router();


router.get("/allStories", protectRoute, showAllStories);
router.get("/friendStories", protectRoute, showFriendStories );
router.post("/", protectRoute, upload.fields([{name:"image", maxCount:1}, {name:"video", maxCount:1}]) ,createStory);
router.delete("/:id", protectRoute, deleteStory);
router.patch("/:id", protectRoute, upload.fields([{name:"image", maxCount:1},{name:"video", maxCount:1}]), updateStory);
router.get("/:id", protectRoute, getStoryById);





export default router;