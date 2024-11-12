import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import {
  createStore,
  readMissionsByStoreId,
} from "../services/store.service.js";

/**
 * 가게 특정 지역에 추가하기
 * @param {*} req 
 * @param {{
    "name": "가게",
    "address": "부산시 어쩌구1"
}} res 
 * @param {*} next 
 */
export const handleStoreCreate = async (req, res, next) => {
  try {
    const store = await createStore(bodyToStore(req.body, req.query.region));

    res.status(StatusCodes.CREATED).json({ result: store });
  } catch (error) {
    next(error);
  }
};

/**
 * 가게 리뷰 리스트 조회하기
 * @param {{
    "memberId": 1,
    "star": 8.9,
    "content": "맛집짱이에요"
}} req 
 * @param {[
    {
        "id": 1,
        "money": 10000,
        "score": 500
    },
    {
        "id": 2,
        "money": 10000,
        "score": 500
    }
]} res 
 * @param {*} next 
 */
export const handleStoreMissionRead = async (req, res, next) => {
  try {
    const missions = await readMissionsByStoreId(parseInt(req.params.storeId));

    res.status(StatusCodes.OK).json(missions);
  } catch (error) {
    next(error);
  }
};
