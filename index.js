require("dotenv").config();
const express = require("express");
console.log(process.env.DB_NAME);

const db = require("./db");
const models = require("./models");
models.init();

const app = express();

app.get("/", (req,res) => {
    res.send("hello world");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
