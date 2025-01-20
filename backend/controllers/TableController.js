import * as TableService from "../services/TableService.js";
import restaurantRepository from "../repository/RestaurantRepository.js"; // Импорт репозитория

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
    const { restaurantId, seats, row_position, col_position } = req.body;

    // Проверяем, существует ли ресторан и является ли текущий пользователь менеджером
    const restaurant = await restaurantRepository.findById(restaurantId);
    if (!restaurant || restaurant.managerId !== req.user.id) {
      return res.status(403).json({ message: "У вас нет прав для добавления стола в этот ресторан." });
    }

    // Создание стола с учетом всех полей
    const table = await TableService.createTable({
      restaurantId,
      seats,
      row_position,
      col_position,
    });
    res.status(201).json(table);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Получить стол по ID
export const getTableById = async (req, res) => {
  try {
    const table = await TableService.getTableById(req.params.id);
    if (!table) {
      return res.status(404).json({ message: "Стол не найден." });
    }
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Обновить стол
export const updateTable = async (req, res) => {
  try {
    const table = await TableService.getTableById(req.params.id);
    
    // Проверяем, существует ли стол и принадлежит ли он менеджеру
    const restaurant = await restaurantRepository.findById(table.restaurantId);
    if (!restaurant || restaurant.managerId !== req.user.id) {
      return res.status(403).json({ message: "У вас нет прав для изменения этого стола." });
    }

    // Обновление стола с учетом всех полей
    const updatedTable = await TableService.updateTable(req.params.id, req.body);
    res.status(200).json(updatedTable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Удалить стол
export const deleteTable = async (req, res) => {
  try {
    const table = await TableService.getTableById(req.params.id);
    
    // Проверяем, существует ли стол и принадлежит ли он менеджеру
    const restaurant = await restaurantRepository.findById(table.restaurantId);
    if (!restaurant || restaurant.managerId !== req.user.id) {
      return res.status(403).json({ message: "У вас нет прав для удаления этого стола." });
    }

    await TableService.deleteTable(req.params.id);
    res.status(204).json({ message: "Стол удалён успешно." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};