import express from "express";
import {
  handleMissionCreate,
  handleMemberMissionCreate,
  handleMemberMissionListReadByStatus,
} from "../controllers/mission.controller.js";

const router = express.Router();

router.post("/store/:storeId", handleMissionCreate);
router.post("/:missionId", handleMemberMissionCreate);
router.get("/mine/:memberId", handleMemberMissionListReadByStatus);

export default router;
