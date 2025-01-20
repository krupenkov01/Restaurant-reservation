import userRepository from '../repository/UserRepository.js';

const userService = {
  createUser: async (userData) => {
    return await userRepository.createUser(userData);
  },

  getUserById: async (userId) => {
    return await userRepository.getUserById(userId);
  },

  getAllUsers: async () => {
    return await userRepository.getAllUsers(); // Новый метод для получения всех пользователей
  },

  updateUser: async (userId, updatedData) => {
    return await userRepository.updateUser(userId, updatedData);
  },

  deleteUser: async (userId) => {
    return await userRepository.deleteUser(userId);
  },
};

export default userService;