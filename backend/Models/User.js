import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Подключение к базе данных

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
      isEmail: true, // Проверка на валидность email
    },
  },
  regpass: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('client', 'admin'),
    allowNull: false,
  },
  
});

export default User;
