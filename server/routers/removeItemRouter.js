const express = require("express");
const router = express.Router();
const { find, updata, wishList, cart } = require("../database.js");
router.post("/wishlist", async (req, res, next) => {
  let gameIds = await find(wishList, { accountName: req.body.accountName });
  let ids = gameIds[0].gamesId;
  let newIds = ids.filter((item) => item !== req.body.gameId);
  updata(wishList, { accountName: req.body.accountName }, { gamesId: newIds });
  res.send({ result: true });
});
router.post("/cart", async (req, res, next) => {
  let gameIds = await find(cart, { accountName: req.body.accountName });
  let ids = gameIds[0].gamesId;
  let newIds = ids.filter((item) => item !== req.body.gameId);
  updata(cart, { accountName: req.body.accountName }, { gamesId: newIds });
  res.send({ result: true });
});
router.post("/all", async (req, res, next) => {
  let gameIds = await find(cart, { accountName: req.body.accountName });
  gameIds = [];
  updata(cart, { accountName: req.body.accountName }, { gamesId: gameIds });
  res.send({ result: true });
});
module.exports = router;
