import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import {addAsFriend, getFriendsByUserId, getAllUsers, getUserDetails, searchFromFriend, searchUsers, unfriend } from "../controllers/user.controller.js";
import { toggleBookmarks } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/friends/:id", protectRoute, getFriendsByUserId);
router.get("/:id", protectRoute, getUserDetails);
router.get("/search", searchUsers);
router.get("/searchFromFriend", protectRoute, searchFromFriend);
router.post("/:id", protectRoute, addAsFriend);
router.patch("/:id", protectRoute, unfriend);






export default router;  