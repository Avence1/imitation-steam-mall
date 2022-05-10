const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const db = mongoose.connection;

const usersData = new Schema({
  accountName: { type: String, unique: true },
  email: String,
  password: String,
  online: Boolean,
});
const gamesData = new Schema({
  gameName: String,
  gameId: { type: Number, unique: true },
  isDiscount: Boolean,
  discount_pct: String,
  origin_price: String,
  finall_price: String,
  appraise: String,
  releaseDate: String,
  platForm: Array,
  tag: Array,
  state: String,
  screenshot: Array,
});
const wishListData = new Schema({
  gamesId: Array,
  accountName: { type: String, unique: true },
});
const cartData = new Schema({
  gamesId: Array,
  accountName: { type: String, unique: true },
});
const users = mongoose.model("users", usersData);
const games = mongoose.model("games", gamesData);
const wishList = mongoose.model("wishList", wishListData);
const cart = mongoose.model("cart", cartData);
function initConnect() {
  return new Promise((resolve, reject) => {
    mongoose.connect("mongodb://127.0.0.1:27017/SteamStore", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db.on("open", () => console.log("数据库连接成功"));
    db.on("disconnected", () => console.log("数据库连接已断开"));
  });
}

function save(model) {
  return new Promise((resolve, reject) => {
    model.save({}, function (err, data) {
      resolve(err ? err : data);
    });
  });
}

function find(model, rules) {
  return new Promise((resolve, reject) => {
    model.find(rules, (err, data) => {
      resolve(err ? null : data);
    });
  });
}
function updata(model, rules, option) {
  return new Promise((resolve, reject) => {
    model.updateOne(rules, option, (err, data) => {
      resolve(err ? null : data);
    });
  });
}
function removeData(model, rules) {
  return new Promise((resolve, reject) => {
    model.deleteOne(rules, () => resolve(find()));
  });
}

module.exports = {
  users,
  games,
  wishList,
  cart,
  removeData,
  updata,
  find,
  save,
  initConnect,
};
