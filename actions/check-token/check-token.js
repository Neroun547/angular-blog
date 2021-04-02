const express = require('express');
const app = express();
const token = require('../../token').token;

app.post('/checkToken', (req, res) => {
    if(req.body.token === token){
        res.status(200).send({message:"Token check"});
    } else {
        res.status(500).send({message:'Войдите в аккаунт чтобы писать статьи'});
    }
})

module.exports = app;