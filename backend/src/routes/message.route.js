import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { addReaction, editMessage, getConversationMessages, getMyMessages, sendMessage } from "../controllers/message.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();


router.get("/", protectRoute, getMyMessages);
router.get("/:friendId", protectRoute, getConversationMessages);
router.post("/:receiverId", protectRoute, upload.fields([{name:"images", maxCount:8},{name:"video", maxCount:1}]),sendMessage);
router.patch("/:messageId", protectRoute, editMessage);
router.post("/reaction/:messageId", protectRoute, addReaction);





export default router;
