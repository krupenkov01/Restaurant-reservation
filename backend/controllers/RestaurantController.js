import restaurantService from "../services/RestaurantService.js";
import restaurantRepository from "../repository/RestaurantRepository.js";

// Получить список всех ресторанов
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantService.getAllRestaurants();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удалить ресторан по ID
const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    await restaurantService.deleteRestaurant(id);
    res.status(200).json({ message: `Ресторан с ID ${id} удалён.` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Создать новый ресторан
const createRestaurant = async (req, res) => {
  try {
    const restaurantData = {
      ...req.body,
      managerId: req.user.id, // Предполагается, что ID менеджера хранится в req.user
    };
    const newRestaurant = await restaurantService.createRestaurant(restaurantData);
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantData = req.body;

    // Проверяем, существует ли ресторан, и является ли текущий пользователь менеджером
    const restaurant = await restaurantRepository.findById(id);
    if (!restaurant) {
      return res.status(404).json({ error: `Ресторан с ID ${id} не найден.` });
    }

    if (restaurant.managerId !== req.user.id) {
      return res.status(403).json({ error: "У вас нет прав для изменения этого ресторана." });
    }

    const updatedRestaurant = await restaurantService.updateRestaurant(id, restaurantData);
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { getAllRestaurants, deleteRestaurant, createRestaurant, updateRestaurant };