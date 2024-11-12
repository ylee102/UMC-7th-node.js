import { responseFromMissionList } from "../dtos/mission.dto.js";
import { responseFromStore } from "../dtos/store.dto.js";
import {
  addStore,
  getMissionsByStoreId,
  getRegionIdByRegion,
  getStoreById,
} from "../repositories/store.repository.js";

export const createStore = async (data) => {
  const region = await getRegionIdByRegion(data.region);
  const regionId = region.id;

  const storeId = await addStore({
    name: data.name,
    address: data.address,
    regionId: regionId,
  });

  const store = await getStoreById(storeId);
  return responseFromStore(store);
};

export const readMissionsByStoreId = async (storeId) => {
  const missionId = await getMissionsByStoreId(storeId);

  return responseFromMissionList(missionId);
};
