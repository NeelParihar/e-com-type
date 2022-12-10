const config = require("../../config");
const { Sequelize } = require("sequelize");

const db = {};

async function initialize() {
  // create db
  const { host, port, user, password, database } = config.database;

  const sequelize = new Sequelize(
    database,
    user,
    password,{
    host,
    dialect: "postgres",
  });

  // init models and add them to the exported db object
  db.User = require("./models/users.model")(sequelize);
  db.Catalog = require("./models/catalogs.model")(sequelize);
  db.Order = require("./models/orders.model")(sequelize);
  db.OrderItem = require("./models/orderItems.model")(sequelize);
  db.Product = require("./models/products.model")(sequelize);
  

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  // sync all models with database
  await sequelize.sync({
    alter: true,
    force: false,
  }).then((data)=>{
    console.log("--------------------------------")
  }).catch((err)=>{
    console.error("--------------------------------")
    console.error(err)
  });
}

initialize();

module.exports = db;