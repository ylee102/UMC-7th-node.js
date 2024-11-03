// src/repositories/region.repository.js
// This repository handles database interactions for region-related operations.

import pool from '../db.config.js'; // Import the MySQL connection pool from your configuration

// Function to find a region by its ID
export const findRegionById = async (regionId) => {
    const query = `SELECT * FROM region WHERE id = ?;`; // SQL query to find the region by ID
    const values = [regionId];

    try {
        const [rows] = await pool.query(query, values); // Execute the query
        return rows[0]; // Return the region record if found, or undefined if not
    } catch (error) {
        throw new Error('Error finding region: ' + error.message);
    }
};
