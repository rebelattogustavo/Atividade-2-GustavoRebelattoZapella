const express = require("express");
const app = express();
app.use(express.json());

// app.use("/api", router);
app.use((req, res)=>{
    res.send("Hi")
});

app.listen(3000, () => {console.log("App listen on http://localhost:3000")});