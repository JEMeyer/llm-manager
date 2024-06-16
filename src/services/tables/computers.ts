import { pool } from '../db';
import { Computer } from './types';

// Create a new computer
export const createComputer = async (
  name: string,
  ipAddr: string
): Promise<number> => {
  const query = 'INSERT INTO computers (name, ip_addr) VALUES (?, ?)';
  const result = await pool.query(query, [name, ipAddr]);
  return Number(result.insertId);
};

// Read all computers
export const getAllComputers = async (): Promise<Computer[]> => {
  const query = 'SELECT * FROM computers';
  const [rows] = await pool.query(query);
  let rowsArray;

  // Handle the case when the table is empty or has a single row
  if (rows === undefined) {
    rowsArray = [];
  } else if (Array.isArray(rows)) {
    rowsArray = rows;
  } else {
    rowsArray = [rows];
  }

  return rowsArray;
};

// Read a computer by id
export const getComputerById = async (id: number): Promise<Computer | null> => {
  const query = 'SELECT * FROM computers WHERE id = ?';
  const [rows] = await pool.query(query, [id]);

  // Handle the case when the table is empty or has a single row
  const row = rows.length > 0 ? rows[0] : null;

  return row;
};

// Update a computer
export const updateComputer = async (
  id: number,
  name: string,
  ipAddr: string
): Promise<number> => {
  const query = 'UPDATE computers SET name = ?, ip_addr = ? WHERE id = ?';
  const result = await pool.query(query, [name, ipAddr, id]);
  return Number(result.affectedRows);
};

// Delete a computer
export const deleteComputer = async (id: number): Promise<number> => {
  const query = 'DELETE FROM computers WHERE id = ?';
  const result = await pool.query(query, [id]);
  return Number(result.affectedRows);
};
