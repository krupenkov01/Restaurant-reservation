import React, { useEffect, useState } from "react";
import "../Styles/RestaurantComments.css"; // Импортируем стили

const RestaurantComments = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:3000/restaurants");
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Ошибка при загрузке ресторанов:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch("http://localhost:3000/comments");
        const data = await response.json();
        const commentsMap = data.reduce((acc, comment) => {
          if (!acc[comment.restaurantId]) {
            acc[comment.restaurantId] = [];
          }
          acc[comment.restaurantId].push(comment.text);
          return acc;
        }, {});
        setComments(commentsMap);
      } catch (error) {
        console.error("Ошибка при загрузке комментариев:", error);
      }
    };

    fetchRestaurants();
    fetchComments();
  }, []);

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setComment("");
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (comment) {
      const newComment = {
        restaurantId: selectedRestaurant.id,
        text: comment,
      };

      try {
        await fetch("http://localhost:3000/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        });

        setComments((prevComments) => ({
          ...prevComments,
          [selectedRestaurant.id]: [
            ...(prevComments[selectedRestaurant.id] || []),
            comment,
          ],
        }));
        setComment("");
      } catch (error) {
        console.error("Ошибка при отправке комментария:", error);
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
