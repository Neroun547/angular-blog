const express = require('express');
const app = express();
const connection = require('../../db-connect/connect');
const ObjectID = require('mongodb').ObjectID;

app.post('/getContent', (req, res) => {
    connection(function(err, client) {
        if(err){
            res.status(500).send({message: "Ошибка загрузки статьи"});
        } else {
            const db = client.db('blog_angular');
            const collectionArticles = db.collection('articles');

            collectionArticles.findOne({_id:new ObjectID(req.body.id)}, (err, result) => {
            if(err){
                res.status(500).send({message:"Ошибка загрузки статьи"});
            }
            if(result){
                res.send({content: result.content, title:result.title});
            }
            if(!result){
                res.status(500).send({message: "Ошибка загрузки статьи"});
            }
        })
        }
    })
})

module.exports = app;