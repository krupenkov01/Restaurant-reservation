import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../db.js';
import { authenticateJWT, authorizeRole } from '../auth/authMiddleware.js';

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key';

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Используйте `Bearer <токен>` для авторизации
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация пользователя
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: Уникальный идентификатор пользователя
 *                 example: 1
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Электронная почта пользователя
 *                 example: user@example.com
 *               regpass:
 *                 type: string
 *                 description: Пароль пользователя
 *                 example: password123
 *               role:
 *                 type: string
 *                 description: Роль пользователя (например, admin, manager)
 *                 example: user
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *       400:
 *         description: Ошибка валидации данных
 */
router.post('/register', async (req, res) => {
  const { id, email, regpass, role } = req.body;
  try {
    const user = await User.create({ id, email, regpass, role });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Авторизация пользователя
 *     tags: [Authentication]
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
 *               regpass:
 *                 type: string
 *                 description: Пароль пользователя
 *                 example: password123
 *     responses:
 *       200:
 *         description: Успешная авторизация, возвращает JWT токен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT токен для доступа
 *       404:
 *         description: Пользователь не найден
 *       401:
 *         description: Неверные учетные данные
 *       400:
 *         description: Ошибка валидации данных
 */
router.post('/login', async (req, res) => {
  const { email, regpass } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(regpass, user.regpass);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/auth/protected:
 *   get:
 *     summary: Пример защищенного маршрута
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Доступ разрешен
 *       401:
 *         description: Необходима авторизация
 */
router.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'You have access!', user: req.user });
});

/**
 * @swagger
 * /api/auth/admin:
 *   get:
 *     summary: Пример маршрута для роли admin
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Добро пожаловать, администратор!
 *       401:
 *         description: Необходима авторизация
 */
router.get('/admin', authenticateJWT, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin!' });
});

/**
 * @swagger
 * /api/auth/manager:
 *   get:
 *     summary: Пример маршрута для роли manager
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Добро пожаловать, менеджер!
 *       401:
 *         description: Необходима авторизация
 */
router.get('/manager', authenticateJWT, authorizeRole('manager'), (req, res) => {
  res.json({ message: 'Welcome, manager!' });
});

export default router;