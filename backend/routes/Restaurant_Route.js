import express from "express";
const router = express.Router();
import restaurantController from "../controllers/RestaurantController.js";

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: API для управления ресторанами
 */

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Получить список всех ресторанов
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: Список ресторанов успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Уникальный идентификатор ресторана
 *                   name:
 *                     type: string
 *                     description: Название ресторана
 *                   address:
 *                     type: string
 *                     description: Адрес ресторана
 *       500:
 *         description: Ошибка сервера
 */
router.get("/", restaurantController.getAllRestaurants);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   delete:
 *     summary: Удалить ресторан по ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Уникальный идентификатор ресторана
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ресторан успешно удален
 *       404:
 *         description: Ресторан не найден
 *       500:
 *         description: Ошибка сервера
 */
router.delete("/:id", restaurantController.deleteRestaurant);

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Создать новый ресторан
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Название ресторана
 *                 example: Ресторан Уют
 *               address:
 *                 type: string
 *                 description: Адрес ресторана
 *                 example: ул. Ленина, д. 10
 *     responses:
 *       201:
 *         description: Ресторан успешно создан
 *       400:
 *         description: Неверный запрос
 *       500:
 *         description: Ошибка сервера
 */
router.post("/", restaurantController.createRestaurant);

export default router;
