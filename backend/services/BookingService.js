import * as BookingRepository from '../repository/BookingRepository.js';

export const createBooking = async (data) => {
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