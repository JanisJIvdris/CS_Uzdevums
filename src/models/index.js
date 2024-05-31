const Sequelize = require("sequelize");
const UserModel = require("./user");
const ProductModel = require("./product");
const AuditModel = require("./audit");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const User = UserModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
const Audit = AuditModel(sequelize, Sequelize);

module.exports = { sequelize, User, Product, Audit };
