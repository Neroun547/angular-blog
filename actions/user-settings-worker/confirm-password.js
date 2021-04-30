const express = require('express');
const app = express();
const connection = require('../../db-connect/connect');
const user = require('../../user');
const { hash } = require('../../services/hash.service');
const bcrypt = require('bcrypt');

app.post('/confirm-password', (req, res) => {
    connection(function(err, client) {
        if(err){
            res.status(500).send({ message:"Ошибка подтверждения почты" });
        } else {
            const db = client.db('blog_angular');
            const collectionUsers = db.collection('users');
            new Promise((resolve, reject) => {
                collectionUsers.findOne({ email: user.email}, (err, result) => {
                    if(err){
                        reject();
                    } 
                    if(!result){
                        reject();
                    } 
                    if(result){
                        if(result.newPassword === hash){
                            bcrypt.hash(user.newPassword, 10, function(err, hash) {
                                if(err){
                                    reject();
                                } else {
                                    collectionUsers.updateOne(
                                        {email: user.email},
                                        { $set: { password:hash } },
                                        { $unset: {newPassword: user.newPassword} })
    
                                    user.newPassword = '';
                                    resolve();
                                }
                            });
                        }
                    }
                })
            })
            .then(() => {
                res.send({message:'Пароль подтвержден успешно'});
            })
            .catch(() => {
                res.status(500).send({ message:"Ошибка подтверждения пароля" });
            })
        }
    })
})

module.exports = app;