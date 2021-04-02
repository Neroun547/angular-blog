const express = require('express');
const app = express();
const user = require('../../user');

app.get('/getUserInfo', (req, res) => {
    if(user){
        res.send({ 
                name:user.name,
                username: user.username,
                phone: user.phone,
                email:user.email
            })
    } else {
        res.status(500).send({message:"Ошибка сервера"})
    }
})

module.exports = app;