import userRepository from '../repository/UserRepository.js';

const userService = {
  createUser: async (userData) => {
    // Здесь можно добавить дополнительные проверки, например, хэширование пароля
    return await userRepository.createUser(userData);
  },

  getUserById: async (userId) => {
    return await userRepository.getUserById(userId);
  },

  getUserByEmail: async (email) => {
    return await userRepository.getUserByEmail(email);
  },

  updateUser: async (userId, updatedData) => {
    return await userRepository.updateUser(userId, updatedData);
  },

  deleteUser: async (userId) => {
    return await userRepository.deleteUser(userId);
  },
};

export default userService;
