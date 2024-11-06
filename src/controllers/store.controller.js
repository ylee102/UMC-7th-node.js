// src/controllers/store.controller.js

//가게 operation controller 
//컨트롤러는 들어오는 http 요청을 처리하고 응답을 (client request/reponse) 보냄. 
//index.js route로 부터 데이터 받은뒤 서비스로 보냄.  

import { storeService } from '../services/store.service.js';
import {listStoreReviews} from '../services/store.service.js';
// 가게 추가 기능을 처리하는 컨트롤러 함수
export const handleAddStore = async (req, res) => {
    try {
        const { regionId } = req.params; // URL에서 지역 ID 추출
        const storeData = req.body; // 요청 본문에서 가게 데이터 추출
        
        // 서비스 계층을 통해 가게 추가 로직 실행
        const newStore = await storeService.addStore(regionId, storeData);
        
        // 성공적으로 추가되면 201 상태 코드와 함께 가게 정보 반환
        res.status(201).json(newStore);
    } catch (error) {
        // 오류 발생 시 500 상태 코드와 에러 메시지 반환
        res.status(500).json({ message: error.message });
    }
};

export const handleListStoreReviews = async(req, res, next) => {
    //유저로 부터 응답 받아서 서비스 계층으로 넘기기
    //어떤 데이터가 전송되냐 ? storeId 추출. 닉네임 1234, 에 해당하는 리뷰들 다 가져오기. 

    //서비스 계층이 storeId 에 해당하는 StoreReviews 가져옴

    const reviews = await listStoreReviews(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string"?parseInt(req.query.cursor) :0 
    );
    res.status(StatusCodes.OK).success(reviews);
}