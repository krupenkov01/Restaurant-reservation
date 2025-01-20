const setupAssociations = ({ User, Restaurant, Table, Booking, Comment }) => {
  // Установка ассоциаций
  User.hasOne(Restaurant, {
    foreignKey: 'managerId',
    onDelete: 'CASCADE',
  });

  Restaurant.belongsTo(User, {
    foreignKey: 'managerId',
  });

  Table.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
  Restaurant.hasMany(Table, { foreignKey: 'restaurantId' });

  Booking.belongsTo(Table, { foreignKey: 'tableId' });
  Table.hasMany(Booking, { foreignKey: 'tableId' });

  Booking.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
  Restaurant.hasMany(Booking, { foreignKey: 'restaurantId' });

  Comment.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
  Restaurant.hasMany(Comment, { foreignKey: 'restaurantId' });
};

export default setupAssociations;