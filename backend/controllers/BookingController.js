import * as BookingService from "../services/BookingService.js";
import restaurantRepository from "../repository/RestaurantRepository.js"; // Импортируем репозиторий ресторанов

// Создать бронирование
export const createBooking = async (req, res) => {
  try {
    const booking = await BookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Получить все бронирования
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingService.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получить бронирование по ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await BookingService.getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found." });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Обновить бронирование
export const updateBooking = async (req, res) => {
  try {
    const booking = await BookingService.getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found." });

    // Проверяем, является ли текущий пользователь менеджером соответствующего ресторана
    const restaurant = await restaurantRepository.findById(booking.restaurantId);
    if (!restaurant || restaurant.managerId !== req.user.id) {
      return res.status(403).json({ message: "У вас нет прав для изменения этого бронирования." });
    }

    const updatedBooking = await BookingService.updateBooking(req.params.id, req.body);
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Удалить бронирование
export const deleteBooking = async (req, res) => {
  try {
    const booking = await BookingService.getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found." });

    // Проверяем, является ли текущий пользователь менеджером соответствующего ресторана
    const restaurant = await restaurantRepository.findById(booking.restaurantId);
    if (!restaurant || restaurant.managerId !== req.user.id) {
      return res.status(403).json({ message: "У вас нет прав для удаления этого бронирования." });
    }

    await BookingService.deleteBooking(req.params.id);
    res.status(204).json({ message: "Booking deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};