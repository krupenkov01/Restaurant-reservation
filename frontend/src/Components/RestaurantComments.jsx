import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Styles/RestaurantComments.css"; // Импортируем стили

const RestaurantComments = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({});

  // Загружаем рестораны и комментарии при монтировании компонента
  useEffect(() => {
    const fetchRestaurantsAndComments = async () => {
      try {
        // Получаем рестораны
        const restaurantsResponse = await axios.get('http://localhost:5000/api/restaurants');
        setRestaurants(restaurantsResponse.data);

        // Получаем комментарии
        const commentsResponse = await axios.get('http://localhost:5000/api/comments');
        const commentsMap = commentsResponse.data.reduce((acc, comment) => {
          if (!acc[comment.restaurantId]) {
            acc[comment.restaurantId] = [];
          }
          acc[comment.restaurantId].push(comment.text);
          return acc;
        }, {});
        setComments(commentsMap);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchRestaurantsAndComments();
  }, []);

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setComment("");
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Отправка комментария
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (comment && selectedRestaurant) {
      const newComment = {
        restaurantId: selectedRestaurant.id,
        text: comment,
      };

      try {
        // Отправка POST-запроса для создания комментария
        const response = await axios.post('http://localhost:5000/api/comments', newComment);

        // Обновление состояния комментариев после успешной отправки
        setComments((prevComments) => ({
          ...prevComments,
          [selectedRestaurant.id]: [
            ...(prevComments[selectedRestaurant.id] || []),
            response.data.text,
          ],
        }));
        setComment(""); // Очистка поля ввода
      } catch (error) {
        console.error('Ошибка при отправке комментария:', error);
      }
    }
  };

  return (
    <div className="rescoms">
      <div className="container">
        {/* РЕСТИКИ */}
        <div className="sidebar">
          <h3>Рестораны</h3>
          <ul>
            {restaurants.map((restaurant) => (
              <li
                key={restaurant.id}
                onClick={() => handleSelectRestaurant(restaurant)}
              >
                {restaurant.name}
              </li>
            ))}
          </ul>
        </div>

        {/*КОММЫ К ОПРЕДЕЛЁННОМУ РЕСТИКУ */}
        <div className="comments-section">
          {selectedRestaurant ? (
            <>
              <h3>Комментарии к {selectedRestaurant.name}</h3>
              <form onSubmit={handleSubmitComment}>
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Напишите ваш комментарий"
                  rows="4"
                />
                <button type="submit">Отправить</button>
              </form>
              <h4>Существующие комментарии:</h4>
              <ul className="comments-list">
                {(comments[selectedRestaurant.id] || []).map((c, index) => (
                  <li key={index}>{c}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>Выберите ресторан, чтобы оставить комментарий.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantComments;
