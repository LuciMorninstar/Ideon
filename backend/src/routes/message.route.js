import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { addReaction, editMessage, getConversationMessages, getMyMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();


router.get("/", protectRoute, getMyMessages);
router.get("/:friendId", protectRoute, getConversationMessages);
router.post("/:receiverId", protectRoute,sendMessage);
router.patch("/:messageId", protectRoute, editMessage);
router.post("/reaction/:messageId", protectRoute, addReaction);





export default router;
