const express = require('express');
const app = express(); 
const jsonParse = express.json();

app.use(jsonParse, function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next();  // передаем обработку запроса методу app.post("/postuser"...
});

module.exports = app;