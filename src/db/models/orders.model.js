const { DataTypes, Sequelize } = require("sequelize");

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    orderSellerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: { type: DataTypes.STRING, allowNull: false },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: false,
    },
    recordStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  };

  const Order = sequelize.define("Order", attributes);

  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      sourceKey: 'id'
    })
  }

  return Order;
}

module.exports = model;
