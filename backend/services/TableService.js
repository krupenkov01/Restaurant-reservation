import * as TableRepository from "../repository/TableRepository.js";

// Получить все столы
export const getAllTables = async () => {
  return await TableRepository.getAllTables();
};

// Создать стол
export const createTable = async (data) => {
  if (!data.restaurantId || !data.seats || data.row_position === undefined || data.col_position === undefined) {
    throw new Error("Invalid data");
  }
  return await TableRepository.createTable(data);
};

// Получить стол по ID
export const getTableById = async (id) => {
  const table = await TableRepository.getTableById(id);
  if (!table) {
    throw new Error("Table not found");
  }
  return table;
};

// Обновить стол
export const updateTable = async (id, data) => {
  return await TableRepository.updateTable(id, data);
};

// Удалить стол
export const deleteTable = async (id) => {
  return await TableRepository.deleteTable(id);
};
