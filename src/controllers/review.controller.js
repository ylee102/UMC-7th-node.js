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
  /*
  #swagger.summary = '가게의 리뷰 가져오기';
  #swagger.description = '특정 가게의 리뷰를 조회합니다.'
  #swagger.parameters['storeId'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: '조회하려는 가게의 고유 ID'
  }
  #swagger.responses[200] = {
    description: '리뷰 조회 성공',
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'SUCCESS' },
            data: {
              type: 'object',
              properties: {
                storeId: { type: 'string', example: '1234' },
                reviews: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      reviewId: { type: 'string', example: '5678' },
                      rating: { type: 'number', example: 4.5 },
                      comment: { type: 'string', example: '훌륭한 서비스!' },
                      createdAt: { type: 'string', example: '2024-11-19T12:34:56Z' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[404] = {
    description: '가게를 찾을 수 없음',
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'FAIL' },
            error: {
              type: 'object',
              properties: {
                errorCode: { type: 'string', example: 'S002' },
                message: { type: 'string', example: '가게를 찾을 수 없습니다.' }
              }
            }
          }
        }
      }
    }
  }
  */
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
  /*
  #swagger.summary = '가게 리뷰 생성'
  #swagger.description = '특정 가게에 대한 리뷰를 작성합니다.'
  #swagger.parameters['storeId'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: '리뷰를 작성할 가게의 고유 ID'
  }
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: 'object',
          required: ['rating', 'comment'],
          properties: {
            rating: { type: 'number', example: 4.5, description: '리뷰 평점 (1~5 사이)' },
            comment: { type: 'string', example: '음식이 정말 맛있었어요!', description: '리뷰 내용' },
            tags: { 
              type: 'array',
              items: { type: 'string' },
              example: ['친절한 직원', '깨끗한 환경'],
              description: '리뷰와 관련된 태그 목록'
            }
          }
        }
      }
    }
  }
  #swagger.responses[201] = {
    description: '리뷰 생성 성공',
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'SUCCESS' },
            data: {
              type: 'object',
              properties: {
                reviewId: { type: 'string', example: '7890' },
                storeId: { type: 'string', example: '1234' },
                rating: { type: 'number', example: 4.5 },
                comment: { type: 'string', example: '음식이 정말 맛있었어요!' },
                tags: {
                  type: 'array',
                  items: { type: 'string' },
                  example: ['친절한 직원', '깨끗한 환경']
                },
                createdAt: { type: 'string', example: '2024-11-19T12:34:56Z' }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: '잘못된 요청 데이터',
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'FAIL' },
            error: {
              type: 'object',
              properties: {
                errorCode: { type: 'string', example: 'R001' },
                message: { type: 'string', example: '유효하지 않은 데이터입니다.' }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[404] = {
    description: '가게를 찾을 수 없음',
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'FAIL' },
            error: {
              type: 'object',
              properties: {
                errorCode: { type: 'string', example: 'S002' },
                message: { type: 'string', example: '가게를 찾을 수 없습니다.' }
              }
            }
          }
        }
      }
    }
  }
*/
  try {
    const review = await createReview(
      parseInt(req.params.storeId),
      bodyToReview(req.body)
    );

    res.status(StatusCodes.CREATED).success( review );
  } catch (error) {
    next(error);
  }
};
