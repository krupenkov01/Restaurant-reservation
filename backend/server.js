import app from "./app.js";
import sequelize from "./db.js";
import cors from 'cors';


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));



const PORT = 5000;

// Подключаемся к базе данных и запускаем сервер
const startServer = async () => {
  try {
    await sequelize.authenticate(); // Проверка подключения к базе данных
    console.log("Подключение к базе данных успешно!");

    await sequelize.sync({ alter: true }); // Синхронизация моделей с базой данных (для разработки)

    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Ошибка при запуске сервера:", error.message);
    process.exit(1); // Завершаем процесс в случае ошибки
  }
};

startServer();
