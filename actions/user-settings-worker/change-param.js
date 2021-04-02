const express = require('express');
const app = express();
const user = require('../../user');
const connection = require('../../db-connect/connect');

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
        } else {
            res.status(500).send({message:"Ошибка"})
        }
    }
    })
})

module.exports = app;