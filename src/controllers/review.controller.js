import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import {
  createReview,
  readStoreReviewList,
} from "../services/review.service.js";

/**
 * 가게 리뷰 리스트 조회하기
 * @param {*} req
 * @param {{
    "data": [
        {
            "id": 1,
            "content": "리뷰1",
            "store": {
                "id": 1,
                "address": "서울특별시",
                "name": "가게1",
                "score": 4.5,
                "regionId": 2
            },
            "member": {
                "id": 1,
                "email": "email@test.com10",
                "name": "신주은",
                "nickname": "사야",
                "gender": "MALE",
                "inactiveDate": "2003-01-12T00:00:00.000Z",
                "phone": "01044445555",
                "photoLink": ""
            }
        }
    ],
    "pagination": {
        "cursor": 5
    }
}} res
 * @param {*} next
 */
export const handleStoreReviewListRead = async (req, res, next) => {
  try {
    const reviews = await readStoreReviewList(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );

    res.status(StatusCodes.OK).json(reviews);
  } catch (error) {
    next(error);
  }
};

/**
 * 리뷰 추가하기
 * @param {{
    "memberId": 1,
    "star": 8.9,
    "content": "맛집짱이에요"
}} req
 * @param {{
    "result": {
        "id": 12,
        "star": 8.9,
        "content": "맛집짱이에요"
    }
}} res
 * @param {*} next
 */
export const handleReviewCreate = async (req, res, next) => {
  try {
    const review = await createReview(
      parseInt(req.params.storeId),
      bodyToReview(req.body)
    );

    res.status(StatusCodes.CREATED).json({ result: review });
  } catch (error) {
    next(error);
  }
};
