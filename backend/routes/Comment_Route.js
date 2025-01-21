import express from 'express';
import commentController from '../controllers/CommentController.js';
import { commentValidation } from "../validations/CommentValidation.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Управление комментариями
 */

/**
 * @swagger
 * /api/comments/restaurant/{restaurantId}:
 *   get:
 *     summary: Получить комментарии по идентификатору ресторана
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         description: Уникальный идентификатор ресторана
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Список комментариев успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Уникальный идентификатор комментария
 *                   restaurantId:
 *                     type: integer
 *                     description: Идентификатор ресторана
 *                   text:
 *                     type: string
 *                     description: Текст комментария
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Дата и время создания комментария
 *       404:
 *         description: Ресторан не найден
 */
router.get('/restaurant/:restaurantId', commentController.getCommentsByRestaurantId);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Создать новый комментарий
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurantId:
 *                 type: integer
 *                 description: Идентификатор ресторана
 *                 example: 101
 *               text:
 *                 type: string
 *                 description: Текст комментария
 *                 example: Отличное место!
 *     responses:
 *       201:
 *         description: Комментарий успешно создан
 *       400:
 *         description: Ошибка валидации данных
 *       500:
 *         description: Ошибка сервера
 */
router.post('/', validate(commentValidation), commentController.createComment);

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Получить все комментарии
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Список всех комментариев успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Уникальный идентификатор комментария
 *                   restaurantId:
 *                     type: integer
 *                     description: Идентификатор ресторана
 *                   text:
 *                     type: string
 *                     description: Текст комментария
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Дата и время создания комментария
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', commentController.getAllComments);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Получить комментарий по ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Уникальный идентификатор комментария
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Комментарий успешно получен
 *       404:
 *         description: Комментарий не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get('/:id', commentController.getCommentById);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Обновить комментарий по ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Уникальный идентификатор комментария
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Новый текст комментария
 *                 example: Обновленный комментарий!
 *     responses:
 *       200:
 *         description: Комментарий успешно обновлен
 *       404:
 *         description: Комментарий не найден
 *       400:
 *         description: Ошибка валидации данных
 *       500:
 *         description: Ошибка сервера
 */
router.put('/:id', commentController.updateComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Удалить комментарий по ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Уникальный идентификатор комментария
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Комментарий успешно удален
 *       404:
 *         description: Комментарий не найден
 *       500:
 *         description: Ошибка сервера
 */
router.delete('/:id', commentController.deleteComment);

export default router;