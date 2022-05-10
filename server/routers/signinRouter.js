const express = require("express");
const router = express.Router();
const { find, users, updata } = require("../database.js");
router.post("/", async (req, res, next) => {
  let data = await find(users, {
    accountName: req.body.accountName,
    password: req.body.password,
  });
  if (data.length === 0) {
    res.send({ result: false });
  } else {
    updata(users, { accountName: req.body.accountName }, { online: true });
    res.send({ result: true });
  }
});

module.exports = router;
