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

export const storeService = {
    addStore,
};
