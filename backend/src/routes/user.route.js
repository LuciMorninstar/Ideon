import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import {addAsFriend, getAllMyFriends, getAllUsers, searchFromFriend, searchUsers, unfriend } from "../controllers/user.controller.js";
import { toggleBookmarks } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/",  getAllUsers);
router.get("/myFriends", protectRoute, getAllMyFriends)
router.get("/search", searchUsers);
router.get("/searchFromFriend", protectRoute, searchFromFriend);
router.post("/:id", protectRoute, addAsFriend);
router.patch("/:id", protectRoute, unfriend);





export default router;  