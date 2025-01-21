import express from "express";
const router = express.Router();
import restaurantController from "../controllers/RestaurantController.js";
import { authenticateJWT, authorizeRole } from "../auth/authMiddleware.js";

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: Управление ресторанами
 */

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Получить все рестораны
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: Список всех ресторанов успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Уникальный идентификатор ресторана
 *                   name:
 *                     type: string
 *                     description: Название ресторана
 *                   location:
 *                     type: string
 *                     description: Местоположение ресторана
 *                   cuisine:
 *                     type: string
 *                     description: Кухня ресторана
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Уникальный идентификатор ресторана
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ресторан успешно удален
 *       404:
 *         description: Ресторан не найден
 *       500:
 *         description: Ошибка сервера
 */
router.delete("/:id", authenticateJWT, restaurantController.deleteRestaurant);

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Создать новый ресторан
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
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
 *                 example: "Итальянская кухня"
 *               location:
 *                 type: string
 *                 description: Местоположение ресторана
 *                 example: "Москва, ул. Примерная, 1"
 *               cuisine:
 *                 type: string
 *                 description: Кухня ресторана
 *                 example: "Итальянская"
 *     responses:
 *       201:
 *         description: Ресторан успешно создан
 *       400:
 *         description: Ошибка валидации данных
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Уникальный идентификатор ресторана
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               cuisine:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ресторан успешно обновлен
 *       404:
 *         description: Ресторан не найден
 *       400:
 *         description: Ошибка валидации данных
 *       500:
 *         description: Ошибка сервера
 */
router.put("/:id", authenticateJWT, restaurantController.updateRestaurant);

export default router;