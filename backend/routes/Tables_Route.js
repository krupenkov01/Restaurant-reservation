import express from "express";
import * as TableController from "../controllers/TableController.js";
import { authenticateJWT } from "../auth/authMiddleware.js"; // Импортируем middleware

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tables
 *   description: Управление столиками
 */

/**
 * @swagger
 * /api/tables:
 *   get:
 *     summary: Получить все столики
 *     tags: [Tables]
 *     responses:
 *       200:
 *         description: Список всех столиков успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Уникальный идентификатор столика
 *                   capacity:
 *                     type: integer
 *                     description: Вместимость столика
 *                   location:
 *                     type: string
 *                     description: Местоположение столика в ресторане
 *       500:
 *         description: Ошибка сервера
 */
router.get("/", TableController.getAllTables);

/**
 * @swagger
 * /api/tables:
 *   post:
 *     summary: Создать новый столик
 *     tags: [Tables]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               capacity:
 *                 type: integer
 *                 description: Вместимость столика
 *                 example: 4
 *               location:
 *                 type: string
 *                 description: Местоположение столика в ресторане
 *                 example: "Зал 1"
 *     responses:
 *       201:
 *         description: Столик успешно создан
 *       400:
 *         description: Ошибка валидации данных
 *       500:
 *         description: Ошибка сервера
 */
router.post("/", authenticateJWT, TableController.createTable);

/**
 * @swagger
 * /api/tables/{id}:
 *   get:
 *     summary: Получить столик по ID
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Уникальный идентификатор столика
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Столик успешно получен
 *       404:
 *         description: Столик не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get("/:id", TableController.getTableById);

/**
 * @swagger
 * /api/tables/{id}:
 *   put:
 *     summary: Обновить столик по ID
 *     tags: [Tables]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Уникальный идентификатор столика
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               capacity:
 *                 type: integer
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Столик успешно обновлен
 *       404:
 *         description: Столик не найден
 *       400:
 *         description: Ошибка валидации данных
 *       500:
 *         description: Ошибка сервера
 */
router.put("/:id", authenticateJWT, TableController.updateTable);

/**
 * @swagger
 * /api/tables/{id}:
 *   delete:
 *     summary: Удалить столик по ID
 *     tags: [Tables]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Уникальный идентификатор столика
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Столик успешно удален
 *       404:
 *         description: Столик не найден
 *       500:
 *         description: Ошибка сервера
 */
router.delete("/:id", authenticateJWT, TableController.deleteTable);

export default router;