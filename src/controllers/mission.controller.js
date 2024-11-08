// src/controllers/mission.controller.js
// 미션 관련 요청을 처리하는 컨트롤러

import { missionService } from '../services/mission.service.js';

// 특정 사용자가 특정 가게의 미션을 시작하는 컨트롤러 함수
export const startMission = async (req, res) => {
    try {
        // URL 파라미터에서 storeId, missionId, userId 추출
        const { storeId, missionId, userId } = req.params;

        // 서비스 계층에서 미션 시작 로직 실행
        const missionStatus = await missionService.startMission(storeId, missionId, userId);

        // 성공적으로 미션이 시작되었을 경우 201 상태 코드로 응답 반환
        res.status(201).json(missionStatus);
    } catch (error) {
        // 미션이 이미 도전 중인 경우 400 상태 코드로 에러 메시지 반환
        if (error.message === "Mission already in progress") {
            return res.status(400).json({ message: error.message });
        }
        // 기타 에러가 발생한 경우 500 상태 코드로 에러 메시지 반환
        res.status(500).json({ message: error.message });
    }
};
