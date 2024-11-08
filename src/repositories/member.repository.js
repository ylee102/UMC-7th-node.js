// src/repositories/member.repository.js
import pool from '../db.config.js';

// 특정 사용자 찾기 또는 없으면 새 사용자 생성
export const findOrCreateMember = async (memberData) => {
    const { email, name } = memberData;

    // 먼저 이메일로 사용자 찾기
    const findQuery = `SELECT * FROM member WHERE email = ?`;
    const [existingMember] = await pool.query(findQuery, [email]);

    // 사용자가 존재하면 해당 사용자 반환
    if (existingMember.length > 0) {
        return existingMember[0];
    }

    // 사용자가 없으면 새 사용자 생성
    const insertQuery = `
        INSERT INTO member (email, name)
        VALUES (?, ?);
    `;
    const result = await pool.query(insertQuery, [email, name]);

    // 생성된 사용자의 ID를 반환
    const memberId = result[0].insertId;
    const selectQuery = `SELECT * FROM member WHERE id = ?`;
    const [newMember] = await pool.query(selectQuery, [memberId]);

    return newMember[0]; // 새로 생성된 사용자 반환
};
