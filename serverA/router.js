const express = require("express");
const router = express.Router();

const users = require("./API/Users/users.controller.js");

router.use("/users" , users);

module.exports = router;