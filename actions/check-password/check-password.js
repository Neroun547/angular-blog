const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const user = require('../../user');
//DB
const connection = require('../../db-connect/connect');


app.post('/checkPassword', (req, res) => {
    connection(function(err, client){
        if(err){
            console.log(err);
            res.status(500).send({ message:'Ошибка' })
        } else {
        const db = client.db('blog_angular');
        const collectionUsers = db.collection('users');
        user.check = false;
        new Promise((resolve, reject) => {
            collectionUsers.findOne({ email:user.email }, (err, result) => {
                if(err){
                    reject();
                } 
                if(result){
                    resolve(result.password);
                }
                if(!result){
                    reject();
                }
            })
        })
        .then((password) => {
            new Promise((resolve, reject) => {
                bcrypt.compare(req.body.password, password, function(err, result) {
                    if(err){
                        reject();
                    } if(result) {
                        user.check = true;
                        resolve();
                    } if(!result){
                        reject();
                    }
                });
            })
            .then(async() => {
                res.send({message:'Пароль введен верно'});
            })
            .catch(() => {
                res.status(500).send({ message:'Неверный пароль' })
            })
        })
        .catch(() => {
            res.status(500).send({ message:'Ошибка' })
        })
    }
})
})

module.exports = app;