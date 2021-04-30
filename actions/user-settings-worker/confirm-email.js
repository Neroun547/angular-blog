const express = require('express');
const app = express();
const connection = require('../../db-connect/connect');
const user = require('../../user');
const { hash } = require('../../services/hash.service');
app.post('/confirm-email', (req, res) => {
    connection(function(err, client) {
        if(err){
            res.status(500).send({ message:"Ошибка подтверждения почты" });
        } else {
            const db = client.db('blog_angular');
            const collectionUsers = db.collection('users');

            collectionUsers.findOne({ email: user.email}, (err, result) => {
                if(err){
                    res.status(500).send({ message:"Ошибка подтверждения почты" });
                } 
                if(!result){
                    res.status(500).send({ message:"Ошибка подтверждения почты" });
                } 
                if(result){
                    if(result.confirmEmailHash === hash){
                        collectionUsers.updateOne(
                            {email: user.email},
                            { $set: { email:user.newEmail } },
                            { $unset: {confirmEmailHash: hash} })
                        user.email = user.newEmail;
                        res.send({ message:"Почта изменена успешно" })
                    }
                }
            })
        }
    })    
});

module.exports = app;