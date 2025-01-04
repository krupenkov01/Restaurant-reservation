import React, { useState } from 'react';
import BookingForm from './BookingForm';

const BookingButton = ({ tables, restaurantId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleForm}>Забронировать столик</button>
      {isOpen && (
        <BookingForm tables={tables} restaurantId={restaurantId} onClose={toggleForm} />
      )}
    </div>
  );
};

export default BookingButton;
