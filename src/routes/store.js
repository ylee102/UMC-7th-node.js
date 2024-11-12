import express from "express";
import { handleMissionCreate } from "../controllers/mission.controller.js";
import {
  handleStoreReviewListRead,
  handleReviewCreate,
} from "../controllers/review.controller.js";
import {
  handleStoreCreate,
  handleStoreMissionRead,
} from "../controllers/store.controller.js";

const router = express.Router();

router.post("", handleStoreCreate);
router.get("/:storeId/reviews", handleStoreReviewListRead);
router.post("/:storeId/reviews", handleReviewCreate);
router.post("/:storeId/missions", handleMissionCreate);
router.get("/:storeId/missions", handleStoreMissionRead);

export default router;
