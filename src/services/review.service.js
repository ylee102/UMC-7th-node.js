// src/services/review.service.js
// 리뷰 추가에 대한 비즈니스 로직 처리

import { createReview } from '../repositories/review.repository.js';
import { findStoreById } from '../repositories/store.repository.js';

export const retrieveUserReviews = async(userId) => {
    return await retriveUserReviewsInRepository(userId);
  }
// 특정 가게에 리뷰를 추가하는 서비스 함수
const addReview = async (storeId, reviewData) => {
    // 가게가 존재하는지 확인
    const store = await findStoreById(storeId);
    if (!store) {
        throw new Error('Store not found');
    }

    // 가게가 존재한다면 리뷰 추가
    const newReview = await createReview(storeId, reviewData);
    return newReview;
};

export const reviewService = {
    addReview,
};
