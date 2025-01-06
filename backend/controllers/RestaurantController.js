import restaurantService from "../services/RestaurantService.js";

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
    const restaurantData = req.body;
    const newRestaurant = await restaurantService.createRestaurant(restaurantData);
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { getAllRestaurants, deleteRestaurant, createRestaurant };