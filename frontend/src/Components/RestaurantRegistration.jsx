import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/RestaurantRegistration.css';

const RestaurantRegistration = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [grid, setGrid] = useState(Array(5).fill().map(() => Array(5).fill(null))); //  СЕТКА
  const [seatsPerTable, setSeatsPerTable] = useState('');

  const toggleTable = (rowIndex, colIndex) => {
    const newGrid = [...grid];
    if (newGrid[rowIndex][colIndex]) {
      newGrid[rowIndex][colIndex] = null; 
    } else {
      newGrid[rowIndex][colIndex] = { seats: seatsPerTable }; 
    }
    setGrid(newGrid);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    
    const restaurantResponse = await axios.post('http://localhost:3000/restaurants', { name: restaurantName });

    
    await Promise.all(grid.flatMap((row, rowIndex) =>
      row.map(async (table, colIndex) => {
        if (table) {
          await axios.post('http://localhost:3000/tables', {
            seats: table.seats,
            restaurantId: restaurantResponse.data.id,
            position: { row: rowIndex, col: colIndex }, 
          });
        }
      })
    ));

    
    setRestaurantName('');
    setGrid(Array(5).fill().map(() => Array(5).fill(null)));
    setSeatsPerTable('');
  };

  return (
    
    <form onSubmit={handleSubmit} className="registration-form">
      <h1>Регистрация ресторана</h1>
      <div>
        <label>Название ресторана:</label>
        <input 
          type="text" 
          value={restaurantName} 
          onChange={(e) => setRestaurantName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Количество мест за столом:</label>
        <input 
          type="number" 
          value={seatsPerTable} 
          onChange={(e) => setSeatsPerTable(e.target.value)} 
          required 
        />
      </div>
      <h2>Схема столов</h2>
      <div className="table-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="table-row">
            {row.map((table, colIndex) => (
              <div 
                key={colIndex} 
                className={`table-cell ${table ? 'occupied' : ''}`} 
                onClick={() => toggleTable(rowIndex, colIndex)}
              >
                {table ? table.seats : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button type="submit">Зарегистрировать ресторан</button>
    </form>
  );
};

export default RestaurantRegistration;
