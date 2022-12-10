const { DataTypes, Sequelize } = require("sequelize");

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    profileUrl: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM, values: ["buyer", "seller"] },
    password: { type: DataTypes.STRING, allowNull: true },
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

  return sequelize.define("User", attributes);
}

module.exports = model;
