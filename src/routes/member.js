import express from "express";
import { handleMemberSignUp } from "../controllers/member.controller.js";

const router = express.Router();

router.post("/signup", handleMemberSignUp);

export default router;
