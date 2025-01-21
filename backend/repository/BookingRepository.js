import {Booking} from '../db.js'; // Импорт модели

export const createBooking = async (data) => {
  return await Booking.create(data);
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