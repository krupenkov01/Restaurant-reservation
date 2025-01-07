import User from '../models/User.js';

const userRepository = {
  createUser: async (userData) => {
    return await User.create(userData);
  },

  getUserById: async (userId) => {
    return await User.findByPk(userId);
  },

  getUserByEmail: async (email) => {
    return await User.findOne({ where: { email } });
  },

  updateUser: async (userId, updatedData) => {
    const user = await User.findByPk(userId);
    if (user) {
      return await user.update(updatedData);
    }
    return null;
  },

  deleteUser: async (userId) => {
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  },
};

export default userRepository;
