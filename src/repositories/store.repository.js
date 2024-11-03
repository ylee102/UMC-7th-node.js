import pool from '../db.config.js'; // 데이터베이스 연결 설정 파일 로드

// ID로 가게를 찾는 함수
export const findStoreById = async (storeId) => {
    const query = `SELECT * FROM store WHERE id = ?`;

    try {
        const [result] = await pool.query(query, [storeId]);
        return result[0] || null; // 가게가 존재하면 레코드 반환, 없으면 null 반환
    } catch (error) {
        throw new Error('Error finding store: ' + error.message);
    }
};
// 새로운 가게를 생성하고 특정 지역과 연관시키는 함수
export const createStore = async (regionId, storeData) => {
    const { name, address, score } = storeData;

    // 새로운 가게 레코드를 삽입하는 SQL 쿼리
    const insertQuery = `
        INSERT INTO store (name, address, score, region_id)
        VALUES (?, ?, ?, ?);
    `;

    const values = [name, address, score, regionId];

    try {
        // Execute the insert query
        const result = await pool.query(insertQuery, values);
        
        // Retrieve the ID of the newly inserted store
        const storeId = result[0].insertId;

        // Fetch the newly created store record using the storeId
        const selectQuery = `SELECT * FROM store WHERE id = ?`;
        const [storeResult] = await pool.query(selectQuery, [storeId]);
        
        return storeResult[0]; // Return the created store record
    } catch (error) {
        throw new Error('Error creating store: ' + error.message);
    }
};
