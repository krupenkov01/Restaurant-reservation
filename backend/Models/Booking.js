import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Подключение к базе данных
import Table from './Table.js'; // Подключение модели столика
import Restaurant from './Restaurant.js'; // Подключение модели ресторана

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  tableId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY, // Только дата
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME, // Только время
    allowNull: false,
  },
});

// Устанавливаем связи
// Каждая бронь принадлежит определенному столу
Booking.belongsTo(Table, { foreignKey: 'tableId' });
Table.hasMany(Booking, { foreignKey: 'tableId' });

// Каждая бронь также принадлежит ресторану
Booking.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Restaurant.hasMany(Booking, { foreignKey: 'restaurantId' });

export default Booking;
