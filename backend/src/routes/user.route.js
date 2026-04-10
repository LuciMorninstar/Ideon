import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import {addAsFriend, getAllMyFriends, unfriend } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/myFriends", protectRoute, getAllMyFriends)
router.post("/:id", protectRoute, addAsFriend);
router.patch("/:id", protectRoute, unfriend);



export default router;  