const express = require("express");
const router = express.Router();

const products = require("./API/Products/products.controller.js");

router.use("/products" , products);


module.exports = router;