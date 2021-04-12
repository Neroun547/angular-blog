const express = require('express');
const app = express();
const connection = require('../../db-connect/connect');

app.get('/getArticleList/:number', (req, res) => {
    const skip = (Number(req.params["number"]) - 1) * 5;
    connection(function(err, client) {
        if(err){
            res.status(500).send({message:"Статьи не найдены"})
        } else {
            const db = client.db('blog_angular');
            const collectionArticles = db.collection('articles');
        new Promise((resolve, reject) => {
            collectionArticles.find({}).sort({_id:-1}).skip(skip).limit(5).toArray((err, result) => {
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
        .then(async (result) => {
            const count = await collectionArticles.find({}).count();
            res.send({message: result, countArticle:count});
        })
        .catch(() => {
            res.status(500).send({message:"Статьи не найдены"})
        })
    }
    })
})

module.exports = app;