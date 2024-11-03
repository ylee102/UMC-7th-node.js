import { pool } from "../db.config.js";  // Ensure the path is correct

// Add a new member (instead of 'user')
export const addUser = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await conn.query(
      `SELECT EXISTS(SELECT 1 FROM member WHERE email = ?) AS isExistEmail;`,
      [data.email]  // Parameter wrapped in an array
    );

    if (confirm[0].isExistEmail) {
      return null;  // Email already exists
    }

    const [result] = await conn.query(
      `INSERT INTO member (email, name, gender, birth, address, detail_address, phoneNumber) 
       VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        data.email,
        data.name,
        data.gender,
        data.birth,
        data.address,
        data.detailAddress,
        data.phoneNumber,
      ]
    );

    return result.insertId;  // Return the new member's ID
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`);
  } finally {
    conn.release();  // Always release the connection
  }
};

// Get a member's information by ID
export const getUser = async (memberId) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await conn.query(
      `SELECT * FROM member WHERE id = ?;`,
      [memberId]  // Parameter wrapped in an array
    );

    console.log(user);

    if (user.length === 0) {
      return null;  // No user found
    }

    return user[0];  // Return the first matching user
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`);
  } finally {
    conn.release();  // Always release the connection
  }
};

// Map food preferences to the member
export const setPreference = async (memberId, foodCategoryId) => {
  const conn = await pool.getConnection();

  try {
    await conn.query(
      `INSERT INTO member_prefer (food_category_id, member_id) VALUES (?, ?);`,
      [foodCategoryId, memberId]  // Parameters in correct order
    );
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`);
  } finally {
    conn.release();  // Always release the connection
  }
};

// Get member's food preferences by ID
export const getUserPreferencesByUserId = async (memberId) => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await conn.query(
      `SELECT mp.id, mp.food_category_id, mp.member_id, fc.name 
       FROM member_prefer mp 
       JOIN food_category fc ON mp.food_category_id = fc.id 
       WHERE mp.member_id = ? 
       ORDER BY mp.food_category_id ASC;`,
      [memberId]  // Parameter wrapped in an array
    );

    return preferences;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`);
  } finally {
    conn.release();  // Always release the connection
  }
};
