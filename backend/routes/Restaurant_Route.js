import express from "express";
const router = express.Router();
import restaurantController from "../controllers/RestaurantController.js";
import { authenticateJWT, authorizeRole } from "../auth/authMiddleware.js";


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
 *     tags:
 *       - Restaurants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID ресторана
 *                 example: 10
 *               name:
 *                 type: string
 *                 description: Название ресторана
 *                 example: "Ресторан Уют"
 *     responses:
 *       201:
 *         description: Ресторан успешно создан
 *       400:
 *         description: Неверный запрос
 *       500:
 *         description: Ошибка сервера
 */
router.post("/", authenticateJWT, authorizeRole("manager"), restaurantController.createRestaurant);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   put:
 *     summary: Обновить ресторан по ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Уникальный идентификатор ресторана
 *         schema:
 *           type: string
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
 *                 example: "Новый Ресторан"
 *     responses:
 *       200:
 *         description: Ресторан успешно обновлён
 *       404:
 *         description: Ресторан не найден
 *       403:
 *         description: У вас нет прав для изменения этого ресторана
 *       500:
 *         description: Ошибка сервера
 */
router.put("/:id", authenticateJWT, restaurantController.updateRestaurant);

export default router;
