import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { sendMessage } from "../controllers/message.controller.js";

const router = express.Router();


router.post("/:receiverId", protectRoute,sendMessage);




export default router;
