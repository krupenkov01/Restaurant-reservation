import express from 'express';
import commentController from '../controllers/CommentController.js';

const router = express.Router();

router.post('/', commentController.createComment);
router.get('/:id', commentController.getCommentById);
router.get('/restaurant/:restaurantId', commentController.getCommentsByRestaurantId);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

export default router;
