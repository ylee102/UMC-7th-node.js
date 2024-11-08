// src/repositories/mission.repository.js
// 미션 관련 데이터베이스 접근 로직

import { prisma } from '../db.config.js'; // Prisma 클라이언트 설정 파일 로드

// 사용자가 특정 미션에 도전 중인지 확인하는 함수
export const checkMissionInProgress = async (userId, missionId) => {
    const missionInProgress = await prisma.memberMission.findFirst({
        where: {
            member_id: userId,
            mission_id: missionId,
            status: 'ongoing',
        },
    });
    return !!missionInProgress; // 이미 도전 중이라면 true 반환
};

// 새로운 미션 도전 상태를 추가하는 함수
export const createUserMission = async (userId, missionId, storeId) => {
    const newMission = await prisma.memberMission.create({
        data: {
            member_id: userId,
            mission_id: missionId,
            status: 'ongoing',
            store_id: storeId,
            created_at: new Date(), // Prisma will automatically convert to the correct format
            updated_at: new Date(),
        },
    });

    return newMission; // 새로 추가된 미션 도전 레코드 반환
};

// 특정 ID의 미션을 찾는 함수
export const findMissionById = async (missionId) => {
    const mission = await prisma.mission.findUnique({
        where: { id: missionId },
    });
    return mission || null; // 미션이 존재하면 해당 레코드 반환, 없으면 null 반환
};