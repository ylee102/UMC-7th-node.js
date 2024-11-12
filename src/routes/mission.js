import express from "express";
import {
  handleMemberMissionCreate,
  handleMemberMissionListReadByStatus,
} from "../controllers/mission.controller.js";

const router = express.Router();

router.post("/:missionId", handleMemberMissionCreate);
router.get("/mine/:memberId", handleMemberMissionListReadByStatus);

export default router;
