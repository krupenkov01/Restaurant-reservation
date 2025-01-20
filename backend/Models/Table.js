import { DataTypes } from 'sequelize';

const TableModel = (sequelize) => {
  const Table = sequelize.define('Table', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    row_position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    col_position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Table;
};

export default TableModel;