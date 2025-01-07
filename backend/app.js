import express from "express";

import userRoutes from "./routes/User_Route.js"; // Подключаем маршруты
import bookingRoutes from "./routes/Restaurant_Route.js"
import restaurantRoutes from "./routes/Restaurant_Route.js"
import tableRoutes from "./routes/Tables_Route.js"
import commentRoutes from './routes/Comment_Route.js';


const app = express();

app.use(express.json()); // Парсинг JSON

app.use("/api/users", userRoutes); 
app.use("/api/bookings", bookingRoutes); 
app.use("/api/restaurants", restaurantRoutes); 
app.use("/api/tables", tableRoutes)
app.use("/api/comments", commentRoutes)
app.use('/api/users', userRoutes);

export default app; // Экспортируем app
