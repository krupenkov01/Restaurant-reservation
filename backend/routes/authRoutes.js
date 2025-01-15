import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { authenticateJWT, authorizeRole } from '../auth/authMiddleware.js';

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key';

// Регистрация пользователя
router.post('/register', async (req, res) => {
  const { id, email, regpass, role } = req.body;
  try {
    const user = await User.create({ id, email, regpass, role });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Авторизация пользователя
router.post('/login', async (req, res) => {
  const { id, regpass } = req.body;
  try {
    const user = await User.findOne({ where: { id } });
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

// Пример защищенного маршрута
router.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'You have access!', user: req.user });
});

// Пример маршрута для роли admin
router.get('/admin', authenticateJWT, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin!' });
});

export default router;
