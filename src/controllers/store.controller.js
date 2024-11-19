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
  /*
  #swagger.summary = '가게 추가 API';
  #swagger.requestBody = {
    required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
                name: {type:"string"},
                region: {type: "string"},
                address: {type: "string"}
              }
            }
          }
        }
      }
  }
  #swagger.responses[200] = {
          description: "가게 추가 성공 응답",
          content: {
            "application.json": {
              schema: {
                type: "object",
                properties: {
                resultType: resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  address: { type: "string"},
                  region: {type: "int"},
                  score: {type: "float"}
                }}
              
              }  
            }
          }
  }
  */
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
  /*
  #swagger.summary = '가게 미션 조회'
  #swagger.description = '특정 가게에 대한 미션 정보를 조회합니다.'
  #swagger.parameters['storeId'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: '조회할 가게의 고유 ID'
  }
  #swagger.responses[200] = {
    description: '가게 미션 조회 성공',
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
                missions: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      missionId: { type: 'string', example: '5678' },
                      title: { type: 'string', example: '첫 방문 인증하기' },
                      description: { type: 'string', example: '가게에서 첫 방문 인증 사진을 찍어 올리세요.' }
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
    const missions = await readMissionsByStoreId(parseInt(req.params.storeId));

    res.status(StatusCodes.OK).json(missions);
  } catch (error) {
    next(error);
  }
};
