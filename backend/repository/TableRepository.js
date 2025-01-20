import {Table} from '../db.js';
// Получить все столы
export const getAllTables = async () => {
  return await Table.findAll();
};

// Добавить стол
export const createTable = async (data) => {
  return await Table.create(data);
};

// Найти стол по ID
export const getTableById = async (id) => {
  return await Table.findByPk(id);
};

// Обновить данные столика
export const updateTable = async (id, data) => {
  const table = await getTableById(id);
  if (!table) {
    throw new Error("Table not found");
  }
  return await table.update(data);
};

// Удалить стол по ID
export const deleteTable = async (id) => {
  const table = await getTableById(id);
  if (!table) {
    throw new Error("Table not found");
  }
  return await table.destroy();
};
