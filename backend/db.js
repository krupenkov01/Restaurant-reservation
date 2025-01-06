import { Sequelize } from 'sequelize';

// Настройка подключения к базе данных
const sequelize = new Sequelize('restiki', 'root', '1234567890', {
  host: 'localhost',
  dialect: 'mysql', 
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Подключение к базе данных установлено успешно!');
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
  }
};

testConnection();

export default sequelize;
