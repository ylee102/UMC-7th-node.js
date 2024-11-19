import express from "express";
import {
  handleMissionCreate,
  handleMemberMissionCreate,
  handleMemberMissionListReadByStatus,
  handleMissionCompletion
} from "../controllers/mission.controller.js";

const router = express.Router();

router.post("/store/:storeId", handleMissionCreate);
router.post("/:missionId", handleMemberMissionCreate);
router.get("/mine/:memberId", handleMemberMissionListReadByStatus);

router.patch("/:missionId", handleMissionCompletion)
export default router;
