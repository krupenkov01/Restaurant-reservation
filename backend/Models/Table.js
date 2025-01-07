import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Подключение к базе данных
import Restaurant from './Restaurant.js'; // Подключение модели ресторана

const Table = sequelize.define('Table', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  row_position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  col_position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
});

// Устанавливаем связь: каждый стол принадлежит одному ресторану
Table.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Restaurant.hasMany(Table, { foreignKey: 'restaurantId' });

export default Table;
