import { Sequelize } from 'sequelize';
import UserModel from './models/User.js';
import RestaurantModel from './models/Restaurant.js';
import TableModel from './models/Table.js';
import BookingModel from './models/Booking.js';
import CommentModel from './models/Comment.js';
import setupAssociations from './models/associations.js';

// Настройка подключения к базе данных
const sequelize = new Sequelize('restiki', 'root', '1234567890', {
  host: 'localhost',
  dialect: 'mysql',
});

// Инициализация моделей
const User = UserModel(sequelize);
const Restaurant = RestaurantModel(sequelize);
const Table = TableModel(sequelize);
const Booking = BookingModel(sequelize);
const Comment = CommentModel(sequelize);

// Установка ассоциаций
setupAssociations({ User, Restaurant, Table, Booking, Comment });

// Проверка подключения
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Подключение к базе данных установлено успешно!');
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
  }
};

testConnection();

export { User, Restaurant, Table, Booking, Comment };
export default sequelize;