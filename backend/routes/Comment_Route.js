import express from 'express';
import commentController from '../controllers/CommentController.js';

const router = express.Router();

router.get('/restaurant/:restaurantId', commentController.getCommentsByRestaurantId);
router.post('/', commentController.createComment);
router.get('/', commentController.getAllComments); // Новый маршрут для получения всех комментариев

router.get('/:id', commentController.getCommentById);

router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

export default router;
