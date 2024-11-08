// src/services/mission.service.js
// 미션 관련 비즈니스 로직 처리

import { checkMissionInProgress, createUserMission } from '../repositories/mission.repository.js';
import { findMissionById } from '../repositories/mission.repository.js';

// 특정 사용자가 특정 가게의 미션을 시작하는 서비스 함수
const startMission = async (storeId, missionId, userId) => {
    // 미션이 존재하는지 확인
    const mission = await findMissionById(missionId);
    if (!mission) {
        throw new Error('Mission not found');
    }

    // 해당 사용자가 이미 미션을 도전 중인지 확인
    const missionInProgress = await checkMissionInProgress(userId, missionId);
    if (missionInProgress) {
        throw new Error('Mission already in progress');
    }

    // 사용자의 미션 도전 상태를 저장
    const newUserMission = await createUserMission(userId, missionId, storeId);
    return newUserMission;
};

export const missionService = {
    startMission,
};
