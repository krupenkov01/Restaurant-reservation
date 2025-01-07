import express from 'express';
import userController from '../controllers/UserController.js';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/', userController.getUserByEmail); // Пример: GET /api/users?email=test@example.com
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
