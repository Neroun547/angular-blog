const express = require('express');
const app = express();
const connection = require('../../db-connect/connect');

app.post('/searchArticles', (req, res) => {
    connection((err, client) => {
        if(err){
            res.status(500).send({message:"Ничего не найдено :("})
        } else {
            const db = client.db("blog_angular")
            const collectionArticles = db.collection('articles');
            const findTheme = req.body.theme.trim().toLowerCase().split(' ');
            collectionArticles.find({theme: { $in: findTheme }}).toArray((err, docs) => {
                if(err){
                    res.status(500).send({message:"Ничего не найдено :("})
                } else {
                    res.send({message:docs});
                }
            })
        }
    })
});

module.exports = app;
