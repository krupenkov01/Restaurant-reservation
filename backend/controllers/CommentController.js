import commentService from '../services/CommentService.js';

const commentController = {

  getAllComments: async (req, res) => {
    try {
      // Получаем все комментарии через сервис
      const comments = await commentService.getAllComments();
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  createComment: async (req, res) => {
    try {
      const comment = await commentService.createComment(req.body);
      return res.status(201).json(comment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getCommentById: async (req, res) => {
    try {
      const comment = await commentService.getCommentById(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      return res.status(200).json(comment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getCommentsByRestaurantId: async (req, res) => {
    const { restaurantId } = req.params;
    try {
      const comments = await commentService.getCommentsByRestaurantId(restaurantId);
      if (!comments) {
        return res.status(404).json({ message: 'Comments not found for this restaurant' });
      }
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  updateComment: async (req, res) => {
    try {
      const updatedComment = await commentService.updateComment(req.params.id, req.body);
      if (!updatedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      return res.status(200).json(updatedComment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const success = await commentService.deleteComment(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default commentController;
