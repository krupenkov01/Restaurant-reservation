import { DataTypes } from 'sequelize';
import sequelize from '../index.js'; // Подключение к базе данных

const Restaurant = sequelize.define('Restaurant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Restaurant;
