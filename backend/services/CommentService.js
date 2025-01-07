import commentRepository from '../repository/CommentRepository.js';

const commentService = {
  createComment: async (commentData) => {
    return await commentRepository.createComment(commentData);
  },

  getCommentById: async (commentId) => {
    return await commentRepository.getCommentById(commentId);
  },

  getCommentsByRestaurantId: async (restaurantId) => {
    return await commentRepository.getCommentsByRestaurantId(restaurantId);
  },

  updateComment: async (commentId, updatedData) => {
    return await commentRepository.updateComment(commentId, updatedData);
  },

  deleteComment: async (commentId) => {
    return await commentRepository.deleteComment(commentId);
  },
};

export default commentService;
