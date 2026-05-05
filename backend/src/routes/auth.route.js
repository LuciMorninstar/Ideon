import express from "express";
import {  getCurrentUser, signIn, signOut, signUp } from "../controllers/auth.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signUp", upload.single("profilePic"), signUp);
router.post("/signIn", signIn);
router.post("/signOut", signOut);
router.get("/getCurrentUser", protectRoute,getCurrentUser);






export default router;