const express = require("express");

const router = require("./router.js");

const app = express();
app.use(express.json());

app.use("/api", router);

app.listen(3000, () => {console.log("App listen on http://localhost:3000")});