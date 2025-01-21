import {Booking} from '../db.js'; // Импорт модели
import { Op } from 'sequelize'; // Импортируем оператор Op из sequelize

// Функция для создания новой брони
export const createBooking = async (data) => {
    return await Booking.create(data);
  };
  
// Функция для поиска существующей брони по столу и времени
export const findBookingByTableAndTime = async (tableId, date, startTime, endTime) => {
    return await Booking.findOne({
      where: {
        tableId: tableId,
        date: date,
        [Op.or]: [
          { time: { [Op.between]: [startTime, endTime] } },  // Проверяем наличие брони в диапазоне времени
        ],
      },
    });
  };
export const getAllBookings = async () => {
  return await Booking.findAll();
};

export const getBookingById = async (id) => {
  return await Booking.findByPk(id);
};

export const updateBooking = async (id, data) => {
  const booking = await getBookingById(id);
  if (!booking) throw new Error("Booking not found");
  return await booking.update(data);
};

export const deleteBooking = async (id) => {
  const booking = await getBookingById(id);
  if (!booking) throw new Error("Booking not found");
  return await booking.destroy();
};