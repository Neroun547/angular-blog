const express = require('express');
const app = express();
const user = require('../../user');
const connection = require('../../db-connect/connect');
const { sendMessage } = require('../../services/sendEmail.service');
const { hash } = require('../../services/hash.service');
const bcrypt = require('bcrypt');

app.post('/changeParam', (req, res) => {
    connection(function(err, client) {
        if(err){
            res.status(500).send({message:"Ошибка"})
        } else {
            const db = client.db('blog_angular');
            const collectionUsers = db.collection('users');
        if(req.body.change === 'username'){
            if(req.body.newparam.trim().length < 3 || req.body.newparam.trim().length > 29){
                res.status(500).send({message:"Ошибка"})
            } else {
            collectionUsers.updateOne({ username: user.username }, { $set: { username: req.body.newparam.trim() } },
                (err, result) => {
                    if(!result){
                        res.status(500).send({message:"Ошибка"})
                    }
                    if(err){
                        res.status(500).send({message:"Ошибка"})
                    } 
                    if(result) {
                        user.username = req.body.newparam;
                        res.send({message:"Изменено успешно"})
                    }
                })
            }
        } else if(req.body.change === 'name'){
            if(req.body.newparam.trim().length < 3 || req.body.newparam.trim().length > 29){
                res.status(500).send({message:"Ошибка"})
            } else {
            collectionUsers.updateOne({ username: user.username }, { $set: { name: req.body.newparam.trim() } },
                (err, result) => {
                    if(!result){
                        res.status(500).send({message:"Ошибка"})
                    }
                    if(err){
                        res.status(500).send({message:"Ошибка"})
                    } 
                    if(result) {
                        user.name = req.body.newparam;
                        res.send({message:"Изменено успешно"})
                    }
                })
            }
        } else if(req.body.change === 'phone'){
            if(isNaN(Number(req.body.newparam.trim()))){
                res.status(500).send({message:"Ошибка"})
            } else {
            collectionUsers.updateOne({ username: user.username }, { $set: { phone: req.body.newparam.trim() } },
                (err, result) => {
                    if(!result){
                        res.status(500).send({message:"Ошибка"})
                    }
                    if(err){
                        res.status(500).send({message:"Ошибка"})
                    } 
                    if(result) {
                        user.phone = req.body.newparam;
                        res.send({message:"Изменено успешно"})
                    }
                })
            }
        } else if(req.body.change === 'email'){
            user.newEmail = req.body.newparam.trim();
            new Promise((resolve, reject) => {
                collectionUsers.findOne({ email:req.body.newparam.trim() }, (err, result) => {
                    if(err){
                        reject();
                    }
                    if(result){
                        reject();
                    } else {
                        resolve();
                    }
                })
            })
            .then(() => {
                sendMessage(req.body.newparam.trim(), 'Подтверждение почты', 'new-email', 'Подтвердить почту')
                .then(() => {
                    collectionUsers.updateOne({email:user.email}, { $set: {confirmEmailHash:hash  } }, { upsert:false });
                    res.send({ message:"На указаною вами почту прийдет письмо с подтверждением" });
                })
                .catch(() => {
                    res.status(500).send({ message:"Ошибка отправки письма" })
                });
            })
            .catch(() => {
                res.status(500).send({ message:"Пользователь с такой почтой уже существует" })
            })
        } else if (req.body.change === 'password') {
            user.newPassword = req.body.newparam.trim();
            sendMessage(user.email, 'Подтверждение пароля', 'new-password', 'Подтвердить пароль')
            .then(() => {
                collectionUsers.updateOne({email:user.email}, { $set: { newPassword:hash  }});
                res.send({message:"На указаною вами почту прийдет письмо с подтверждением"})
            })
            .catch((e) => {
                console.log(e);
                res.status(500).send({message:"Ошибка"})
            })
        }
        else {
            res.status(500).send({message:"Ошибка"})
        }
    }
    })
})

module.exports = app;