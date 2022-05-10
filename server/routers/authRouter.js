const express = require("express");
const router = express.Router();
let gamesInCart, gamesInWishlist;
const {
  find,
  users,
  updata,
  games,
  save,
  cart,
  wishList,
} = require("../database.js");
router.post("/", async (req, res, next) => {
  const email = req.body.email;
  let data = await find(users, { email: email });
  data.length !== 0 ? res.send({ result: true }) : res.send({ result: false });
});
router.post("/name", async (req, res, next) => {
  const name = req.body.name;
  let data = await find(users, { accountName: name });
  data.length === 0 ? res.send({ result: true }) : res.send({ result: false });
});
router.post("/online", async (req, res, next) => {
  const data = await find(users, { online: true });
  data.length !== 0
    ? res.send({ result: true, data: data[0] })
    : res.send({ result: false });
});
router.post("/signout", async (req, res, next) => {
  let data = await updata(
    users,
    { accountName: req.body.accountName },
    { online: false }
  );
  res.send(data === null ? { result: false } : { result: true });
});
//验证游戏是否在购物车
router.post("/inCart", async (req, res, next) => {
  gamesInCart = await find(cart, { accountName: req.body.accountName });
  if (gamesInCart.length !== 0) {
    let x = gamesInCart[0].gamesId.find((item) => item === req.body.gameId);
    x === undefined
      ? res.send({ result: false })
      : res.send({ result: true, data: gamesInCart[0].gamesId });
  } else {
    res.send({ result: false });
  }
});
router.post("/addToCart", async (req, res, next) => {
  if (gamesInCart.length === 0) {
    let x = await save(
      new cart({
        gamesId: [req.body.gameId],
        accountName: req.body.accountName,
      })
    );
    console.log(x);
  } else {
    let ids = gamesInCart[0].gamesId;
    ids.push(req.body.gameId);
    updata(cart, { accountName: req.body.accountName }, { gamesId: ids });
  }

  res.send({ result: true });
});

router.post("/inWishlist", async (req, res, next) => {
  gamesInWishlist = await find(wishList, { accountName: req.body.accountName });
  if (gamesInWishlist.length !== 0) {
    let x = gamesInWishlist[0].gamesId.find((item) => item === req.body.gameId);
    x === undefined
      ? res.send({ result: false })
      : res.send({ result: true, data: gamesInWishlist[0].gamesId });
  } else {
    res.send({ result: false });
  }
});
router.post("/addToWishlist", async (req, res, next) => {
  if (!gamesInWishlist || gamesInWishlist.length === 0) {
    let x = await save(
      new wishList({
        gamesId: [req.body.gameId],
        accountName: req.body.accountName,
      })
    );
  } else {
    let ids = gamesInWishlist[0].gamesId;
    ids.push(req.body.gameId);
    let x = updata(
      wishList,
      { accountName: req.body.accountName },
      { gamesId: ids }
    );
  }
  res.send({ result: true });
});

router.post("/inCartNumber", async (req, res, next) => {
  gamesInCartNumber = await find(cart, { accountName: req.body.accountName });
  if (gamesInCartNumber.length !== 0) {
    res.send({ result: true, data: gamesInCartNumber[0].gamesId.length });
  } else {
    res.send({ result: false });
  }
});
router.post("/inWishlistNumber", async (req, res, next) => {
  gamesInWishlistNumber = await find(wishList, {
    accountName: req.body.accountName,
  });
  if (gamesInWishlistNumber.length !== 0) {
    res.send({ result: true, data: gamesInWishlistNumber[0].gamesId.length });
  } else {
    res.send({ result: false });
  }
});
router.post("/inCartGames", async (req, res, next) => {
  gamesInCart = await find(cart, { accountName: req.body.accountName });
  if (gamesInCart.length !== 0) {
    res.send({ result: true, data: gamesInCart[0].gamesId });
  } else {
    res.send({ result: false });
  }
});
router.post("/inWishlistGames", async (req, res, next) => {
  gamesInWishlist = await find(wishList, {
    accountName: req.body.accountName,
  });
  if (gamesInWishlist.length !== 0) {
    res.send({ result: true, data: gamesInWishlist[0].gamesId });
  } else {
    res.send({ result: false });
  }
});
router.post("/getCartGames", async (req, res, next) => {
  let cartGames = [];
  for (let i = 0; i < req.body.ids.length; i++) {
    let data = await find(games, { gameId: req.body.ids[i] });
    data ? cartGames.push(data[0]) : "";
  }
  res.send({ result: true, data: cartGames });
});
module.exports = router;
