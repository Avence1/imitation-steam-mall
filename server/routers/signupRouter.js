const express = require("express");
const router = express.Router();
const { save, users } = require("../database.js");
let email, country;
router.post("/", (req, res, next) => {
  email = req.body.email;
  country = req.body.country;
  res.send({ result: true });
});
router.post("/join", async (req, res, next) => {
  const data = req.body;
  let result = await save(
    new users({
      accountName: data.accountName,
      email: email,
      password: data.password,
      online: false,
      remember: false,
    })
  );
  result ? res.send({ result: true }) : res.send({ result: false });
});
module.exports = router;
