const { DataTypes, Sequelize } = require("sequelize");

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    thumbnailUrl: { type: DataTypes.STRING, allowNull: true },
    catalogId: {
      type: DataTypes.UUID,
      references: {
        model: "Catalogs",
        key: "id",
      },
      allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
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

  const Product = sequelize.define("Product", attributes);

  Product.associate = function (models) {
    Product.belongsTo(models.Catalog, {
      foreignKey: 'catalogId',
      sourceKey: 'id'
    })
  }

  return Product;
}

module.exports = model;
