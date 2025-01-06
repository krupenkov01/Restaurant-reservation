import Restaurant from "../models/Restaurant.js";

// Найти все рестораны
const findAll = async () => {
  return await Restaurant.findAll();
};

// Найти ресторан по ID
const findById = async (id) => {
  return await Restaurant.findByPk(id);
};

// Удалить ресторан по ID
const deleteRest = async (id) => {
  return await Restaurant.destroy({ where: { id } });
};

// Создать новый ресторан
const create = async (restaurantData) => {
  return await Restaurant.create(restaurantData);
};

export default {
  findAll,
  findById,
  deleteRest,
  create,
};
