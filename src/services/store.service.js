import { createStore } from '../repositories/store.repository.js';
import { findRegionById } from '../repositories/region.repository.js';

// 가게를 추가하는 서비스 함수
const addStore = async (regionId, storeData) => {
    // 지역이 존재하는지 확인
    const region = await findRegionById(regionId);
    if (!region) {
        throw new Error('Region not found');
    }

    // 지역이 존재하면 가게 추가
    const newStore = await createStore(regionId, storeData);
    return newStore;
};

export const listStoreReviews = async (storeId) => {
    //받은 id가지고 repository로 보내서 data 가져오기. 
    //변수에 저장
    const reviews = await getAllStoreReviews(storeId);
    //데이터를 가져와서 유저에게 리턴
    return responseFromReviews(reviews);
    
}

export const storeService = {
    addStore,
};
