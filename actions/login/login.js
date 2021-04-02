const express = require('express');
const app = express();
const connection = require('../../db-connect/connect');
const user = require('../../user');
const bcrypt = require('bcrypt');
const token = require('../../token').token;

    app.post('/login', (req, res) => {
        connection(function(err, client){
            if (err) {
               console.log("Error: " + err);
               res.status(500).send({ message:'Ошибка аунтефикации' })
            } 
            else {
                const db = client.db('blog_angular');
                const collectionUsers = db.collection("users");
            new Promise((resolve, reject) => {
                collectionUsers.findOne({ email:req.body.email }, (err, result) => {
                    if(err){
                        console.log("Error: " + err);
                        reject();
                    } 
                    if(result){
                        user.name = result.name;
                        user.email = result.email;
                        user.phone = result.phone;
                        user.username = result.username;
                        user.avatar = result.avatar;
                        resolve(result.password);
                    }
                    if(!result){
                        reject();
                    }
                })
            })
            .then((password) => {
                new Promise((resolve, reject) => {
                    bcrypt.compare(req.body.password.trim(), password, function(err, result) {
                        if(err){
                            reject();
                        } if(result) {
                            resolve();
                        } if(!result){
                            reject();
                        }
                    });
                })
                .then(async() => {
                    client.close(); 
                    res.send({ token:token })
                })
                .catch(() => {
                    client.close();
                    res.status(500).send({ message:'Ошибка аунтефикации' })
                })
            })
            .catch(() => {
                client.close();
                res.status(500).send({ message:'Ошибка аунтефикации' })
            })
        }
    })
});

module.exports = app;