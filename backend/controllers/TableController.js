import * as TableService from "../services/TableService.js";

// Получить все столы
export const getAllTables = async (req, res) => {
  try {
    const tables = await TableService.getAllTables();
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Создать стол
export const createTable = async (req, res) => {
  try {
    const table = await TableService.createTable(req.body);
    res.status(201).json(table);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Получить стол по ID
export const getTableById = async (req, res) => {
  try {
    const table = await TableService.getTableById(req.params.id);
    res.status(200).json(table);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Обновить стол
export const updateTable = async (req, res) => {
  try {
    const table = await TableService.updateTable(req.params.id, req.body);
    res.status(200).json(table);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Удалить стол
export const deleteTable = async (req, res) => {
  try {
    await TableService.deleteTable(req.params.id);
    res.status(204).json({ message: "Table deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
