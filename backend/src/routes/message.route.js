import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getConversationMessages, getMyMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();


router.get("/", protectRoute, getMyMessages);
router.get("/:friendId", protectRoute, getConversationMessages);
router.post("/:receiverId", protectRoute,sendMessage);




export default router;
