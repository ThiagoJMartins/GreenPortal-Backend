require("dotenv").config();
const { Sequelize } = require("sequelize");
const FavoriteModel = require("./models/Favorite");
const UserModel = require("./models/User");

const sequelize = new Sequelize(
  "postgresql://postgres:5AFBeBB5-e22c5eDCbf3-d2Fa3**a3g2@roundhouse.proxy.rlwy.net:14304/railway",
  { logging: false, native: false }
);

FavoriteModel(sequelize);
UserModel(sequelize);

const { User, Favorite } = sequelize.models;
Favorite.belongsToMany(User, { through: "user_favorite" });
User.belongsToMany(Favorite, { through: "user_favorite" });

module.exports = {
  User,
  Favorite,
  conn: sequelize,
};
