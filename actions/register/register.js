const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

const connection = require('../../db-connect/connect');
app.post('/register', (req, res) => {
    connection(function(err, client) {
        if(err){
            console.log(err);
            res.status(500).send({message:'Ошибка регистрации'});
        } else {
        const db = client.db('blog_angular');
        const collectionUsers = db.collection('users');

        new Promise((resolve, reject) => {
            collectionUsers.find( { $or: [ { username: req.body.username },
                { email:req.body.email }, {phone:req.body.phone}] }).toArray((err, result) => {
                    console.log(result);
                    if(err){
                        reject();
                    }
                    if(result.length === 0){
                        resolve();
                    }
                    if(result.length > 0){
                        reject();
                    }
                })
        })
        .then(() => {
            new Promise((resolve, reject) => {
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    if(err){
                        reject();
                    } else {
                        collectionUsers.insertOne({
                            name:req.body.name.trim(),
                            username:req.body.username.trim(),
                            email:req.body.email.trim(),
                            phone:req.body.phone.trim(),
                            password:hash
                        }, (err) => {
                            if(err){
                                reject();
                            } else {
                                resolve();
                            }
                        })
                    }
                });
            })
            .then(() => {
                res.status(200).send({messaeg: 'Регистрация прошла успешно'});
            })
            .catch(() => {
                res.status(500).send({message:'Ошибка регистрации'});
            })
        })
        .catch(() => {
            res.status(500).send({message:'Ошибка регистрации'});
        })
    }
    })
})

module.exports = app;