import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingButton from './BookingButton';
import '../Styles/RestaurantList.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantsResponse = await axios.get('http://localhost:5000/api/restaurants');
        const tablesResponse = await axios.get('http://localhost:5000/api/tables');

        const tablesByRestaurant = tablesResponse.data.reduce((acc, table) => {
          if (!acc[table.restaurantId]) {
            acc[table.restaurantId] = [];
          }
          acc[table.restaurantId].push(table);
          return acc;
        }, {});

        const restaurantsData = restaurantsResponse.data.map((restaurant) => ({
          ...restaurant,
          tables: tablesByRestaurant[restaurant.id] || [],
        }));

        setRestaurants(restaurantsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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
                {restaurant.tables.length > 0 ? (
                  restaurant.tables.map((table) => (
                    <li key={table.id}>
                      Стол: {table.id} - {table.seats} мест
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
