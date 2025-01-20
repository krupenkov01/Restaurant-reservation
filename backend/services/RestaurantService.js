import restaurantRepository from "../repository/RestaurantRepository.js";

// Получить список всех ресторанов
const getAllRestaurants = async () => {
  return await restaurantRepository.findAll();
};

// Удалить ресторан по ID
const deleteRestaurant = async (id) => {
  const restaurant = await restaurantRepository.findById(id);
  if (!restaurant) {
    throw new Error(`Ресторан с ID ${id} не найден.`);
  }
  return await restaurantRepository.deleteRest(id);
};

// Создать новый ресторан
const createRestaurant = async (restaurantData) => {
  if (!restaurantData.name || !restaurantData.managerId) {
    throw new Error("Название и managerId обязательны.");
  }
  return await restaurantRepository.create(restaurantData);
};

const updateRestaurant = async (id, restaurantData) => {
  const restaurant = await restaurantRepository.findById(id);
  if (!restaurant) {
    throw new Error(`Ресторан с ID ${id} не найден.`);
  }
  return await restaurantRepository.update(id, restaurantData);
};

export default {
  getAllRestaurants,
  deleteRestaurant,
  createRestaurant,
  updateRestaurant,
};