const express = require("express");
const router = express.Router();
const { find, games, updata } = require("../database.js");
router.post("/", async (req, res, next) => {
  let data;
  switch (req.body.data) {
    case "all":
      data = await find(games, { gameId: { $gte: 0 } });
      break;
    default:
      data = await find(games, { gameName: req.body.data });
      break;
  }
  res.send({ result: data });
});
router.post("/byId", async (req, res, next) => {
  let data = await find(games, { gameId: req.body.gameId });
  res.send({ result: data[0] });
});
module.exports = router;
