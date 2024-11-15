import { StatusCodes } from "http-status-codes";
import { bodyToMission, validateMissionId} from "../dtos/mission.dto.js";
import {
  createMemberMission,
  createMission,
  readMemberMissionListByStatus,
  readMemberMissionList,
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
