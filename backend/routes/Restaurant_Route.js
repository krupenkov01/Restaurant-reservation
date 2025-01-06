import express from "express";
const router = express.Router();
import restaurantController from "../controllers/RestaurantController.js";

// Получить список всех ресторанов
router.get("/", restaurantController.getAllRestaurants);

// Удалить ресторан по ID
router.delete("/:id", restaurantController.deleteRestaurant);

// Создать новый ресторан
router.post("/", restaurantController.createRestaurant);

export default router;