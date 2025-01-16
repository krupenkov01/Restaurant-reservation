import app from "./app.js";
import sequelize from "./db.js";
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));



const PORT = 5000;

const swaggerDefinition = {
  openapi: '3.0.0', // Использование OpenAPI 3.0
  info: {
    title: 'Restaurant Reservation API', // Название вашего API
    version: '1.0.0', // Версия API
    description: 'API для бронирования ресторанов', // Описание API
  },
  servers: [
    {
      url: 'http://localhost:5000', // URL сервера
    },
  ],
};


const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Путь к файлам, где вы будете описывать API
};

const swaggerSpec = swaggerJSDoc(options);

// Подключение Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant Reservation API!');
});

// Подключаемся к базе данных и запускаем сервер
const startServer = async () => {
  try {
    await sequelize.authenticate(); // Проверка подключения к базе данных
    console.log("Подключение к базе данных успешно!");

    await sequelize.sync({ alter: true }); // Синхронизация моделей с базой данных (для разработки)

    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });

    console.log(`Swagger UI доступен по адресу: http://localhost:${PORT}/api-docs`);

  } catch (error) {
    console.error("Ошибка при запуске сервера:", error.message);
    process.exit(1); // Завершаем процесс в случае ошибки
  }
};

startServer();
