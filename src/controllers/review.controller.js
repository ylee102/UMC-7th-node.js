// src/controllers/review.controller.js
import { reviewService } from '../services/review.service.js';
import { findOrCreateUser } from '../services/user.service.js';
import {retrieveUserReviews} from '../services/review.service.js';

//유저가 쓴 리뷰를 가져오는 함수
export const handleListUserReviews = async (req, res) => {
    try {
        const {userId} = req.params;

        const reviews = await retrieveUserReviews(userId);

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: "해당 유저의 리뷰가 없습니다" });
        }

        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

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
