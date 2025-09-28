const express = require("express");

const app = express.Router();

let product = [
    { id: 1, title: "product one" },
    { id: 2, title: "product two" }
]

app.get('/', (req, res) => {
    res.status(200).json(product);
  });

module.exports = app;