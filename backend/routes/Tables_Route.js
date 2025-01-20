import express from "express";
import * as TableController from "../controllers/TableController.js";

/**
 * @swagger
 * tags:
 *   name: Tables
 *   description: API для управления столами
 */
const router = express.Router();

/**
 * @swagger
 * /api/tables:
 *   get:
 *     summary: Получить все столы
 *     tags: [Tables]
 *     parameters:
 *       - in: query
 *         name: restaurantId
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID ресторана для фильтрации столов
 *     responses:
 *       200:
 *         description: Список всех столов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   restaurantId:
 *                     type: integer
 *                   seats:
 *                     type: integer
 *                   row_position:
 *                     type: integer
 *                   col_position:
 *                     type: integer
 *                   restaurant:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *       500:
 *         description: Ошибка сервера
 */
router.get("/", TableController.getAllTables);

/**
 * @swagger
 * /api/tables:
 *   post:
 *     summary: Создать новый стол
 *     tags: [Tables]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Уникальный идентификатор стола
 *               restaurantId:
 *                 type: integer
 *                 description: ID ресторана, которому принадлежит стол
 *               seats:
 *                 type: integer
 *                 description: Количество мест за столом
 *               row_position:
 *                 type: integer
 *                 description: Позиция стола (ряд)
 *               col_position:
 *                 type: integer
 *                 description: Позиция стола (колонка)
 *     responses:
 *       201:
 *         description: Стол успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 restaurantId:
 *                   type: integer
 *                 seats:
 *                   type: integer
 *                 row_position:
 *                   type: integer
 *                 col_position:
 *                   type: integer
 *       500:
 *         description: Ошибка сервера
 */
router.post("/", TableController.createTable);

/**
 * @swagger
 * /api/tables/{id}:
 *   get:
 *     summary: Получить информацию о столе по ID
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Уникальный идентификатор стола
 *     responses:
 *       200:
 *         description: Информация о столе
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 restaurantId:
 *                   type: integer
 *                 seats:
 *                   type: integer
 *                 row_position:
 *                   type: integer
 *                 col_position:
 *                   type: integer
 *                 restaurant:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *       404:
 *         description: Стол не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get("/:id", TableController.getTableById);

/**
 * @swagger
 * /api/tables/{id}:
 *   put:
 *     summary: Обновить информацию о столе
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Уникальный идентификатор стола
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurantId:
 *                 type: integer
 *               seats:
 *                 type: integer
 *               row_position:
 *                 type: integer
 *               col_position:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Информация о столе обновлена
 *       404:
 *         description: Стол не найден
 *       500:
 *         description: Ошибка сервера
 */
router.put("/:id", TableController.updateTable);

/**
 * @swagger
 * /api/tables/{id}:
 *   delete:
 *     summary: Удалить стол по ID
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Уникальный идентификатор стола
 *     responses:
 *       200:
 *         description: Стол успешно удален
 *       404:
 *         description: Стол не найден
 *       500:
 *         description: Ошибка сервера
 */
router.delete("/:id", TableController.deleteTable);

export default router;
