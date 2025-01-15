import express from 'express';
import userController from '../controllers/UserController.js';
import {userValidation} from "../validations/UserValidation.js"
import validate from "../middlewares/validate.js";

const router = express.Router();

router.post(
    "/",
    validate(userValidation.userValidation), // Middleware для валидации
    userController.createUser // Убедитесь, что `createUser` экспортируется правильно
  );
router.get('/:id', userController.getUserById);
router.get('/', userController.getUserByEmail); // Пример: GET /api/users?email=test@example.com
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
