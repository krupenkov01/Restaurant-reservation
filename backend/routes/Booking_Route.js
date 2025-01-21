import express from "express";
import * as BookingController from "../controllers/BookingController.js";
import { authenticateJWT } from "../auth/authMiddleware.js"; // Импортируем middleware

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Управление бронированиями
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Создать новое бронирование
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tableId:
 *                 type: integer
 *                 description: Идентификатор столика
 *                 example: 1
 *               restaurantId:
 *                 type: integer
 *                 description: Идентификатор ресторана
 *                 example: 101
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Дата бронирования
 *                 example: "2023-10-21"
 *               time:
 *                 type: string
 *                 format: time
 *                 description: Время бронирования
 *                 example: "18:30:00"
 *     responses:
 *       201:
 *         description: Бронирование успешно создано
 *       400:
 *         description: Ошибка валидации данных
 *       500:
 *         description: Ошибка сервера
 */
router.post("/", authenticateJWT, BookingController.createBooking);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Получить все бронирования
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: Список бронирований успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Уникальный идентификатор бронирования
 *                   tableId:
 *                     type: integer
 *                     description: Идентификатор столика
 *                   restaurantId:
 *                     type: integer
 *                     description: Идентификатор ресторана
 *                   date:
 *                     type: string
 *                     format: date
 *                     description: Дата бронирования
 *                   time:
 *                     type: string
 *                     format: time
 *                     description: Время бронирования
 *       500:
 *         description: Ошибка сервера
 */
router.get("/", BookingController.getAllBookings);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Получить бронирование по ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Уникальный идентификатор бронирования
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Бронирование успешно получено
 *       404:
 *         description: Бронирование не найдено
 *       500:
 *         description: Ошибка сервера
 */
router.get("/:id", BookingController.getBookingById);

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     summary: Обновить бронирование по ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Уникальный идентификатор бронирования
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tableId:
 *                 type: integer
 *               restaurantId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 format: time
 *     responses:
 *       200:
 *         description: Бронирование успешно обновлено
 *       404:
 *         description: Бронирование не найдено
 *       500:
 *         description: Ошибка сервера
 */
router.put("/:id", authenticateJWT, BookingController.updateBooking);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Удалить бронирование по ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Уникальный идентификатор бронирования
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Бронирование успешно удалено
 *       404:
 *         description: Бронирование не найдено
 *       500:
 *         description: Ошибка сервера
 */
router.delete("/:id", authenticateJWT, BookingController.deleteBooking);

export default router;