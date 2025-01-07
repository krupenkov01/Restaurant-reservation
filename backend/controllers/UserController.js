import userService from '../services/UserService.js';

const userController = {
  createUser: async (req, res) => {
    try {
      const user = await userService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getUserByEmail: async (req, res) => {
    try {
      const user = await userService.getUserByEmail(req.query.email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const success = await userService.deleteUser(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default userController;
