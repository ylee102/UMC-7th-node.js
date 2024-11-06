// src/controllers/review.controller.js
import { reviewService } from '../services/review.service.js';
import { findOrCreateUser } from '../repositories/user.repository.js';

// 특정 가게에 리뷰를 추가하는 컨트롤러 함수
export const handleAddReview = async (req, res) => {
    try {
        const { storeId } = req.params;
        const { score, comment, email, name} = req.body;

        // 사용자를 찾거나 없으면 새로 생성
        const member = await findOrCreateUser({ email, name});

        // member_id와 함께 리뷰 추가
        const reviewData = {
            score,
            comment,
            memberId: member.id
        };
        const newReview = await reviewService.addReview(storeId, reviewData);

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
