import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/BookingForm.css';

const BookingForm = ({ tables, restaurantId, onClose }) => {
  const [selectedTable, setSelectedTable] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:3000/bookings', {
        tableId: selectedTable,
        restaurantId,
        date,
        time
      });
      alert('Бронирование успешно!');
      onClose(); 
    } catch (error) {
      console.error('Ошибка при бронировании:', error);
      alert('Не удалось забронировать столик.');
    }
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="booking-form">
        <h2>Забронировать столик</h2>
        <form  onSubmit={handleSubmit} >
          <div className='bookingInpt'>
            <div className='sectionOfBooking'>Выберите столик:</div>
            <select onChange={(e) => setSelectedTable(e.target.value)} required>
              <option value="">Выберите столик</option>
              {tables.map((table) => (
                <option key={table.id} value={table.id}>
                  {table.name} - {table.seats} мест
                </option>
              ))}
            </select>
          </div>
          <div className='bookingInpt'>
            <div className='sectionOfBooking'>Дата:</div>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className='bookingInpt'>
            <div className='sectionOfBooking'>Время:</div>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
          <button type="submit">Забронировать</button>
          <button type="button" onClick={onClose}>Закрыть</button>
        </form>
      </div>
    </>
  );
};

export default BookingForm;
