import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingButton from './BookingButton';
import '../Styles/RestaurantList.css'

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await axios.get('http://localhost:3000/restaurants');
      const restaurantsData = await Promise.all(
        response.data.map(async (restaurant) => {
          const tablesResponse = await axios.get(`http://localhost:3000/tables?restaurantId=${restaurant.id}`);
          return { ...restaurant, tables: tablesResponse.data };
        })
      );
      setRestaurants(restaurantsData);
    };

    fetchRestaurants();
  }, []); 

  return (
    <div className='rlist'>
      <div>
      <h1>Restaurant list:</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className='card'>
            <header><h2>{restaurant.name}</h2></header>
            <h3>Столы:</h3>
            <ul>
              {restaurant.tables && restaurant.tables.length > 0 ? (
                restaurant.tables.map((table) => (
                  <li key={table.id}>
                    {table.name} - {table.seats} мест
                  </li>
                ))
              ) : (
                <li>Нет столов</li>
              )}
            </ul>
            <BookingButton tables={restaurant.tables} restaurantId={restaurant.id} />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default RestaurantList;
