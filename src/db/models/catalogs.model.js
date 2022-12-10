const { DataTypes, Sequelize } = require("sequelize");

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: true },
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

  const Catalog = sequelize.define("Catalog", attributes);

  Catalog.associate = function (models) {
    Catalog.belongsTo(models.User, {
      foreignKey: 'userId',
      sourceKey: 'id'
    })
  }
  
  return Catalog;
}

module.exports = model;
