import {Restaurant} from '../db.js';
import { DbLog } from "../models/LogModels.js"; // Импортируйте модель DbLog

// Функция для логирования действий с базой данных
const logDbAction = async (action, collection, documentId) => {
  const logData = new DbLog({
    action,
    collection,
    documentId,
  });

  try {
    await logData.save();
    console.log('DB лог сохранен:', logData);
  } catch (error) {
    console.error('Ошибка при сохранении DB лога:', error);
  }
};

// Найти все рестораны
const findAll = async () => {
  const restaurants = await Restaurant.findAll();
  await logDbAction('findAll', 'Restaurant', null); // Логируем действие
  return restaurants;
};

// Найти ресторан по ID
const findById = async (id) => {
  const restaurant = await Restaurant.findByPk(id);
  await logDbAction('findById', 'Restaurant', id); // Логируем действие
  return restaurant;
};

// Удалить ресторан по ID
const deleteRest = async (id) => {
  const result = await Restaurant.destroy({ where: { id } });
  await logDbAction('deleteRest', 'Restaurant', id); // Логируем действие
  return result;
};

// Создать новый ресторан
const create = async (restaurantData) => {
  const restaurant = await Restaurant.create(restaurantData);
  await logDbAction('create', 'Restaurant', restaurant.id); // Логируем действие
  return restaurant;
};

// Обновить ресторан по ID
const update = async (id, restaurantData) => {
  const restaurant = await Restaurant.findByPk(id);
  if (!restaurant) {
    throw new Error(`Ресторан с ID ${id} не найден.`);
  }
  return await restaurant.update(restaurantData);
};

export default {
  findAll,
  findById,
  deleteRest,
  create,
  update,
};