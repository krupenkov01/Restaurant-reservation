import Comment from '../models/Comment.js';

const commentRepository = {
  createComment: async (commentData) => {
    return await Comment.create(commentData);
  },

  getCommentById: async (commentId) => {
    return await Comment.findByPk(commentId);
  },

  getCommentsByRestaurantId: async (restaurantId) => {
    return await Comment.findAll({ where: { restaurantId } });
  },

  updateComment: async (commentId, updatedData) => {
    const comment = await Comment.findByPk(commentId);
    if (comment) {
      return await comment.update(updatedData);
    }
    return null;
  },

  deleteComment: async (commentId) => {
    const comment = await Comment.findByPk(commentId);
    if (comment) {
      await comment.destroy();
      return true;
    }
    return false;
  },
};

export default commentRepository;
