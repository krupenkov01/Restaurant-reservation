import { DataTypes } from 'sequelize';
import sequelize from '../db.js';  // Подключение к базе данных
import Restaurant from "../models/Restaurant.js";  // Подключение модели ресторана

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  
});

// Установим связь: каждый комментарий принадлежит одному ресторану
Comment.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Restaurant.hasMany(Comment, { foreignKey: 'restaurantId' });

export default Comment;
