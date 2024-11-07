// src/repositories/review.repository.js
// 리뷰 관련 데이터베이스 접근 로직

import { prisma } from '../db.config.js'; // Prisma 클라이언트 설정 파일 로드

// 리뷰를 데이터베이스로부터 가져오는 함수
//유저 id에 해당하는 리뷰 반환

export const retrieveUserReviewsInRepository = async (userId) => {
    userId = parseInt(userId, 10) 
    const reviews = await prisma.review.findMany({
      where: {
        userId: userId, // Filters reviews by the given userId
      },
      select: {
        id: true,
        content: true,
        score: true,
        created_at: true,  // Assuming `created_at` is a timestamp for when the review was created
        store: {
          select: {
            id: true,
            name: true,  // Include the store name for each review
          },
        },
      },
      orderBy: {
        created_at: 'desc', // Orders by creation date in descending order (most recent first)
      },
    });
  
    return reviews;
  };

// 새로운 리뷰를 데이터베이스에 추가하는 함수
export const createReview = async (storeId, reviewData) => {
    const { score, comment, userId } = reviewData;

    try {
        // Prisma를 사용하여 새로운 리뷰를 생성
        const newReview = await prisma.review.create({
            data: {
                score: score,
                body: comment,
                user: {
                    connect: { id: userId }, // userId와 연결
                },
                store: {
                    connect: { id: storeId }, // storeId와 연결
                },
                created_at: new Date(),
                updated_at: new Date(),
            },
        });

        return newReview; // 생성된 리뷰 레코드 반환
    } catch (error) {
        throw new Error('리뷰 생성 오류: ' + error.message); // 오류 발생 시 에러 메시지 출력
    }
};
