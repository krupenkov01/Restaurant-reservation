import express from 'express';
import commentController from '../controllers/CommentController.js';
import {commentValidation} from "../validations/CommentValidation.js"
import validate from "../middlewares/validate.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API для управления комментариями
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
 *           type: string
 *     responses:
 *       200:
 *         description: Комментарии успешно получены
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Уникальный идентификатор комментария
 *                   text:
 *                     type: string
 *                     description: Текст комментария
 *                   userId:
 *                     type: string
 *                     description: Идентификатор пользователя
 *                   restaurantId:
 *                     type: string
 *                     description: Идентификатор ресторана
 *       404:
 *         description: Ресторан или комментарии не найдены
 *       500:
 *         description: Ошибка сервера
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
 *               text:
 *                 type: string
 *                 description: Текст комментария
 *                 example: Отличный ресторан, рекомендую!
 *               userId:
 *                 type: string
 *                 description: Идентификатор пользователя
 *                 example: 12345
 *               restaurantId:
 *                 type: string
 *                 description: Идентификатор ресторана
 *                 example: 67890
 *     responses:
 *       201:
 *         description: Комментарий успешно создан
 *       400:
 *         description: Неверный запрос
 *       500:
 *         description: Ошибка сервера
 */
router.post(
    '/', 
    validate(commentValidation.commentValidation),
    commentController.createComment);

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Получить все комментарии
 *     tags: [Comments]
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
 *                     type: string
 *                     description: Уникальный идентификатор комментария
 *                   text:
 *                     type: string
 *                     description: Текст комментария
 *                   userId:
 *                     type: string
 *                     description: Идентификатор пользователя
 *                   restaurantId:
 *                     type: string
 *                     description: Идентификатор ресторана
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
 *           type: string
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
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Обновленный текст комментария
 *                 example: Понравилось ещё больше!
 *     responses:
 *       200:
 *         description: Комментарий успешно обновлен
 *       404:
 *         description: Комментарий не найден
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
 *           type: string
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
