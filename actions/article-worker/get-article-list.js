const express = require('express');
const app = express();
const connection = require('../../db-connect/connect');

app.get('/getArticleList', (req, res) => {
    connection(function(err, client) {
        if(err){
            res.status(500).send({message:"Статьи не найдены"})
        } else {
            const db = client.db('blog_angular');
            const collectionArticles = db.collection('articles');
        new Promise((resolve, reject) => {
            collectionArticles.find({}).toArray((err, result) => {
                if(err){
                    reject();
                    return;
                }
                if(!result.length){
                    reject();
                    return;
                } else {
                    resolve(result);
                    return;
                }
            })
        })
        .then((result) => {
            res.send({message: result});
        })
        .catch(() => {
            res.status(500).send({message:"Статьи не найдены"})
        })
    }
    })
})

module.exports = app;