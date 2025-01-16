import express from "express";
import bodyParser from 'body-parser';
import passport from 'passport';
import authRoutes from './routes/authRoutes.js';
import initializePassport from './auth/passport.js';
import morgan from 'morgan';


import userRoutes from "./routes/User_Route.js"; // Подключаем маршруты
import bookingRoutes from "./routes/Restaurant_Route.js"
import restaurantRoutes from "./routes/Restaurant_Route.js"
import tableRoutes from "./routes/Tables_Route.js"
import commentRoutes from './routes/Comment_Route.js';

import connectDB from './mongo.js';
import { HttpLog } from "./models/LogModels.js"; // Импортируйте модели логов



const app = express();

connectDB();

app.use(async (req, res, next) => {
    const start = Date.now(); // Начало отслеживания времени
  
    // Обработка запроса
    res.on('finish', async () => {
      const responseTime = Date.now() - start;
  
      // Проверка статуса ответа
      const status = res.statusCode;
  
      // Логирование запроса
      const logData = new HttpLog({
        method: req.method,
        url: req.originalUrl,
        status: isNaN(status) ? 0 : status, // Установка значения по умолчанию
        responseTime: isNaN(responseTime) ? 0 : responseTime, // Установка значения по умолчанию
      });
  
      try {
        await logData.save();
        console.log('Лог успешно сохранен');
      } catch (error) {
        console.error('Ошибка при сохранении лога:', error);
      }
    });
  
    next(); // Передаем управление следующему middleware
  });


app.use(bodyParser.json());
app.use(passport.initialize());
initializePassport(passport);



app.use(express.json()); // Парсинг JSON


app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/bookings", bookingRoutes); 
app.use("/api/restaurants", restaurantRoutes); 
app.use("/api/tables", tableRoutes)
app.use("/api/comments", commentRoutes)
app.use('/api/users', userRoutes);

export default app; // Экспортируем app
