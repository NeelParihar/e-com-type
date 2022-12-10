const { DataTypes, Sequelize } = require("sequelize");

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      references: {
        model: "Products",
        key: "id",
      },
      allowNull: false,
    },
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: "Orders",
        key: "id",
      },
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
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

  const OrderItem = sequelize.define("OrderItem", attributes);

  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'orderId',
      sourceKey: 'id'
    })

    OrderItem.belongsTo(models.Product, {
      foreignKey: 'productId',
      sourceKey: 'id'
    })
  }

  return OrderItem; 
}

module.exports = model;
