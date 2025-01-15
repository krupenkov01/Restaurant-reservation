// File: models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  regpass: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('client', 'admin'),
    allowNull: false,
    indexes: false,
  },
  
   
});

// Хэшируем пароль перед сохранением
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.regpass = await bcrypt.hash(user.regpass, salt);
});

export default User;
