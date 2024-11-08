// src/repositories/store.repository.js
// 가게 관련 데이터베이스 접근 로직

import { prisma } from '../db.config.js'; // Prisma 클라이언트 설정 파일 로드

// ID로 특정 가게를 찾는 함수
export const findStoreById = async (storeId) => {
    try {
        // Prisma를 사용하여 가게 레코드 찾기
        const store = await prisma.store.findUnique({
            where: { id: storeId },
        });
        return store || null; // 가게가 존재하면 레코드 반환, 없으면 null 반환
    } catch (error) {
        throw new Error('가게 찾기 오류: ' + error.message); // 오류 발생 시 에러 메시지 출력
    }
};

// 새로운 가게를 생성하고 특정 지역과 연관시키는 함수
export const createStore = async (regionId, storeData) => {
    const { name, address, score } = storeData;

    try {
        // Prisma를 사용하여 새로운 가게 레코드를 생성하고 지역과 연결
        const newStore = await prisma.store.create({
            data: {
                name: name,
                address: address,
                score: score,
                region: {
                    connect: { id: regionId }, // regionId와 연결하여 지역 설정
                },
                created_at: new Date(),
                updated_at: new Date(),
            },
        });
        
        return newStore; // 생성된 가게 레코드 반환
    } catch (error) {
        throw new Error('가게 생성 오류: ' + error.message); // 오류 발생 시 에러 메시지 출력
    }
};

// 특정 가게의 모든 리뷰를 가져오는 함수
export const getAllStoreReviews = async (storeId, cursor = 0) => {
    try {
        // storeId에 해당하는 리뷰 가져오기 (페이징 및 정렬 포함)
        const reviews = await prisma.review.findMany({
            select: {
                id: true,
                content: true,
                storeId: true,
                userId: true,
                store: true,
                user: true,
            },
            where: {
                storeId: storeId,
                id: { gt: cursor }, // cursor보다 큰 id만 조회하여 페이징 처리
            },
            orderBy: { id: "asc" },
            take: 5, // 최대 5개의 레코드만 조회
        });
        return reviews;
    } catch (error) {
        throw new Error('리뷰 조회 오류: ' + error.message); // 오류 발생 시 에러 메시지 출력
    }
};
