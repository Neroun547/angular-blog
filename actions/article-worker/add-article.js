const express = require('express');
const app = express();
const collectionArticles = require('../../db-connect/connect').collectionArticles;
const connection = require('../../db-connect/connect');

app.post('/addArticle', (req, res) => {
    if(req.body.avtor.trim().length < 1 || req.body.avtor.trim().length > 29){
        res.status(500).send({message:"Ошибка добавления статьи"})
    }  
    else if(req.body.title.trim().length < 1 || req.body.title.trim().length > 30){
        res.status(500).send({message:"Ошибка добавления статьи"})
    } 
    else if(req.body.theme.trim().length < 1 || req.body.theme.trim().length > 30){
        res.status(500).send({message:"Ошибка добавления статьи"})
    }  
    else if(req.body.content.trim().length < 10){
        res.status(500).send({message:"Ошибка добавления статьи"})
    } else {
        connection(function(err, client) {
            if(err){
                console.log(err);
                res.status(500).send({message:"Ошибка добавления статьи"});
            } else {
            const db = client.db('blog_angular');
            const collectionArticles = db.collection('articles');

                collectionArticles.insertOne({
                    avtor:req.body.avtor.trim(),
                    title: req.body.title.trim(),
                    theme: req.body.theme.trim(),
                    content: req.body.content.trim(),
                    date:new Date()
                }, (err) => {
                    if(err){
                        res.status(500).send({message:"Ошибка добавления статьи"});
                    } else {
                        res.send({message: 'Статью добавлено'})
                    }
                })
            }
        })
    }
})

module.exports = app;