// src/repositories/review.repository.js
// 리뷰 관련 데이터베이스 접근 로직

import pool from '../db.config.js'; // 데이터베이스 연결 설정 파일 로드

// 새로운 리뷰를 데이터베이스에 추가하는 함수
export const createReview = async (storeId, reviewData) => {
    const { score, comment, memberId } = reviewData; // Use 'score' instead of 'rating'

    // 리뷰를 삽입하는 SQL 쿼리
    const query = `
        INSERT INTO review (score, body, member_id, store_id)
        VALUES (?, ?, ?, ?);
    `;

    const values = [score, comment, memberId, storeId]; // Use 'score' in the values array

    try {
        const result = await pool.query(query, values);

        // 삽입된 리뷰의 ID를 기반으로 해당 리뷰를 다시 조회
        const reviewId = result[0].insertId;
        const selectQuery = `SELECT * FROM review WHERE id = ?`;
        const [reviewResult] = await pool.query(selectQuery, [reviewId]);

        return reviewResult[0]; // 생성된 리뷰 레코드 반환
    } catch (error) {
        throw new Error('Error creating review: ' + error.message);
    }
};
