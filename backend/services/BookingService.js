import * as BookingRepository from '../repository/BookingRepository.js';



export const createBooking = async (data) => {
    // Определяем время начала и окончания запрета (время бронирования и два часа после)
    const bookingTime = new Date(`${data.date}T${data.time}`);
    const endTime = new Date(bookingTime);
    endTime.setHours(endTime.getHours() + 2);
  
    // Проверяем, существует ли уже бронь на этот столик в указанное время и в течение следующих двух часов
    const existingBooking = await BookingRepository.findBookingByTableAndTime(data.tableId, data.date, bookingTime, endTime);
    if (existingBooking) {
      throw new Error("Бронь на этот столик в указанное время или в течение следующих двух часов уже существует.");
    }
    
    // Если нет конфликта, создаем новую бронь
    return await BookingRepository.createBooking(data);
  };

export const getAllBookings = async () => {
  return await BookingRepository.getAllBookings();
};

export const getBookingById = async (id) => {
  return await BookingRepository.getBookingById(id);
};

export const updateBooking = async (id, data) => {
  return await BookingRepository.updateBooking(id, data);
};

export const deleteBooking = async (id) => {
  return await BookingRepository.deleteBooking(id);
};