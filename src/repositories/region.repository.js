// src/repositories/region.repository.js
// This repository handles database interactions for region-related operations.
import { prisma } from '../db.config.js'; // Prisma 클라이언트 설정 파일 로드

// ID로 특정 지역을 찾는 함수
export const findRegionById = async (regionId) => {
    try {
        const region = await prisma.region.findUnique({
            where: { id: regionId },
        });
        return region; // 지역 레코드가 있으면 반환하고, 없으면 undefined 반환
    } catch (error) {
        throw new Error('지역 찾기 오류: ' + error.message); // 오류 발생 시 에러 메시지 출력
    }
};
