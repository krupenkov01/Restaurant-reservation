import express from 'express';
import userController from '../controllers/UserController.js';
import { userValidation } from "../validations/UserValidation.js";
import validate from "../middlewares/validate.js";
import { authenticateJWT, authorizeRole } from "../auth/authMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Управление пользователями
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Создать нового пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Электронная почта пользователя
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: Пароль пользователя
 *                 example: password123
 *               role:
 *                 type: string
 *                 description: Роль пользователя (например, admin, user)
 *                 example: user
 *     responses:
 *       201:
 *         description: Пользователь успешно создан
 *       400:
 *         description: Ошибка валидации данных
 *       500:
 *         description: Ошибка сервера
 */
router.post(
    "/",
    validate(userValidation.userValidation), // Middleware для валидации
    userController.createUser
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Уникальный идентификатор пользователя
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Пользователь успешно получен
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get('/:id', userController.getUserById);
router.get('/:id', userController.getUserById);
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Получить всех пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список всех пользователей успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Уникальный идентификатор пользователя
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: Электронная почта пользователя
 *                   role:
 *                     type: string
 *                     description: Роль пользователя
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', authenticateJWT, authorizeRole("admin"), userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Обновить пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Уникальный идентификатор пользователя
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Электронная почта пользователя
 *               password:
 *                 type: string
 *                 description: Новый пароль пользователя
 *               role:
 *                 type: string
 *                 description: Новая роль пользователя
 *     responses:
 *       200:
 *         description: Пользователь успешно обновлен
 *       404:
 *         description: Пользователь не найден
 *       400:
 *         description: Ошибка валидации данных
 *       500:
 *         description: Ошибка сервера
 */
router.put('/:id',  authenticateJWT, authorizeRole("admin"), userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Удалить пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Уникальный идентификатор пользователя
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Пользователь успешно удален
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка сервера
 */
router.delete('/:id', authenticateJWT, authorizeRole("admin"), userController.deleteUser);

export default router;