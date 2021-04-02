const express = require('express');
const app = express();

const user = require('../../user');

app.get('/activeChange', (req, res) => {
    if(user.check){
        user.check = false; 
        res.send({check:true})
    } else {
        res.status(500).send({message:"Ошибка"});
    }
})

module.exports = app;