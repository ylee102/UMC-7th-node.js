import { StatusCodes } from "http-status-codes";
import { bodyToMission, validateMissionId} from "../dtos/mission.dto.js";
import {
  createMemberMission,
  createMission,
  readMemberMissionListByStatus,
  readMemberMissionList,
  changeMissionStatus
} from "../services/mission.service.js";

/**
 * 미션 추가하기
 * @param {{
    "money": 10000,
    "score": 500
}} req 
 * @param {{
    "result": {
        "id": 4,
        "storeId": 2,
        "money": 10000,
        "score": 500
    }
}} res 
 */


export const handleMissionCreate = async (req, res, next) => {
  /*
  #swagger.summary = '미션 생성'
  #swagger.description = '새로운 미션을 생성합니다.'
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: 'object',
          required: ['money', 'storeId', 'score'],
          properties: {
            money: { type: 'number', example: 1000, description: '미션 보상 금액' },
            storeId: { type: 'number', example: '1234', description: '미션이 생성될 가게의 고유 ID' },
            score: { type: 'number', example: 10, description: '미션 완료 시 부여되는 점수' }
          }
        }
      }
    }
  }
  #swagger.responses[201] = {
    description: '미션 생성 성공',
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'SUCCESS' },
            data: {
              type: 'object',
              properties: {
                missionId: { type: 'number', example: '5678' },
                money: { type: 'number', example: 1000 },
                storeId: { type: 'string', example: '1234' },
                score: { type: 'number', example: 10 },
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
                errorCode: { type: 'string', example: 'M001' },
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
    // Parse and validate input
    const storeId = parseInt(req.params.storeId);
    if (isNaN(storeId)) {
      return res.error({
        errorCode: "STORE_ID 맞지 않음",
        reason: "Store ID 가 숫자이어야합니다.",
      });
    }

    const mission = await createMission(
      parseInt(req.params.storeId),
      bodyToMission(req.body)
    );

    res.status(StatusCodes.CREATED).success({ mission });
  } catch (error) {
    next(error);
  }
};

/**
 * 미션 도전하기
 * @param {{
    "memberId": 1
}} req
 * @param {{
    "result": {
        "id": 3,
        "status": "CHALLENGING"
    }
}} res
 */
export const handleMemberMissionCreate = async (req, res, next) => {
/*
  #swagger.summary = '회원 미션 생성/참여 요청'
  #swagger.description = '회원이 특정 미션을 생성하거나 참여를 요청합니다.'
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: 'object',
          required: ['memberId', 'missionId', 'details'],
          properties: {
            memberId: { type: 'string', example: '1234', description: '회원의 고유 ID' },
            missionId: { type: 'string', example: '5678', description: '참여하려는 미션의 고유 ID' },
            details: {
              type: 'object',
              properties: {
                goal: { type: 'string', example: '하루 10,000보 걷기', description: '미션 목표' },
                duration: { type: 'number', example: 7, description: '미션 기간 (일 단위)' }
              },
              description: '미션 세부 정보'
            }
          }
        }
      }
    }
  }
  #swagger.responses[201] = {
    description: '미션 생성 성공',
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'SUCCESS' },
            data: {
              type: 'object',
              properties: {
                missionStatus: { type: 'string', example: 'CREATED', description: '미션 상태' },
                memberId: { type: 'string', example: '1234' },
                missionId: { type: 'string', example: '5678' },
                startDate: { type: 'string', example: '2024-11-19', description: '미션 시작 날짜' },
                endDate: { type: 'string', example: '2024-11-26', description: '미션 종료 날짜' }
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
                errorCode: { type: 'string', example: 'MM001' },
                message: { type: 'string', example: '유효하지 않은 요청 데이터입니다.' }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[404] = {
    description: '회원 또는 미션을 찾을 수 없음',
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'FAIL' },
            error: {
              type: 'object',
              properties: {
                errorCode: { type: 'string', example: 'MM002' },
                message: { type: 'string', example: '회원 또는 미션을 찾을 수 없습니다.' }
              }
            }
          }
        }
      }
    }
  }
*/
  try {
    // DTO를 통해 missionId 검증
    const missionId = validateMissionId(req.params.missionId);

    const { memberId } = req.body;
    if (!memberId) {
      const error = new Error("Member ID is required");
      error.statusCode = 400;
      error.errorCode = "MISSING_MEMBER_ID";
      throw error;
    }

    // 성공적으로 작동하면 res.success로 결과 반환
    const memberMission = await createMemberMission(missionId, memberId);
    res.status(StatusCodes.CREATED).success(memberMission);
  } catch (error) {
    next(error);
  }
};

/**
 * 내 미션 리스트 조회하기 (param 존재 시 상태로 검색)
 * @param {*} req 
 * @param {{
    "result": {
        "missions": [
            {
                "id": 1,
                "money": 10000,
                "score": 500
            },
            {
                "id": 1,
                "money": 10000,
                "score": 500
            }
        ]
    }
}} res 
 */
export const handleMemberMissionListReadByStatus = async (req, res, next) => {
    try{
  const status = req.query.status;
  const memberId = parseInt(req.params.memberId);

  const missions = status
    ? await readMemberMissionListByStatus(memberId, status)
    : await readMemberMissionList(memberId);

  res.status(StatusCodes.OK).success(missions);
    } catch (error) {
        next(error);
    }
};

export const handleMissionCompletion = async(req, res, next) => {
  const missionId = req.params.missionId
  // missionId 유효성 검사
  if (isNaN(missionId) || parseInt(missionId,10)<0) {    
    return res.status(400).success({
      success: false,
      message: "Invalid missionId. It must be a positive number.",
    });
}
  
try {
  const mission = await changeMissionStatus(parseInt(missionId,10));
  res.status(200).success({success : true, mission});
} catch (error) {
  next(error)
  }
}
