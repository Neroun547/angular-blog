//Token
const token = require('./token').token;
//Library and Mongo...
const express = require('express');
const app = express();
const jsonParse = express.json();
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require("mongodb").ObjectID;
const uri = "mongodb+srv://Admin:js234dh3@cluster0.pfc7g.mongodb.net/blog_angular?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
new Promise((resolve, reject) => {
    client.connect(err => {
        if(err){
            reject();
        } else {
            resolve();
        }
    });
})
.then(() => {
    const db = client.db("blog_angular");
    const collectionUsers = db.collection("users");
    const collectionArticles = db.collection("articles");

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
        next();  // передаем обработку запроса методу app.post("/postuser"...
      });
       
 
    app.post('/register', jsonParse,  (req, res) => {
        new Promise((resolve, reject) => {
            if(collectionUsers.find( { $or: [ { username: req.body.username }, { phone:req.body.phone }, 
                { email:req.body.email } ]
            })){
                resolve();
            } else {
                reject();
            }
        })
        .then(() => {
            new Promise((resolve, reject) => {
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    if(err){
                        reject();
                    } else {
                        collectionUsers.insertOne({
                            name:req.body.name.trim(),
                            username:req.body.username.trim(),
                            email:req.body.email.trim(),
                            phone:req.body.phone.trim(),
                            password:hash
                        }, (err) => {
                            if(err){
                                reject();
                            } else {
                                resolve();
                            }
                        })
                    }
                });
            })
            .then(() => {
                res.status(200).send({messaeg: 'Регистрация прошла успешно'});
            })
            .catch(() => {
                res.status(500).send({message:'Ошибка регистрации'});
            })
        })
        .catch(() => {
            res.status(500).send({message:'Ошибка регистрации'});
        })
    })

    app.post('/login', jsonParse, (req, res) => {
        new Promise((resolve, reject) => {
            collectionUsers.findOne({ email:req.body.email }, (err, result) => {
                if(err){
                    reject();
                } 
                if(result){
                    resolve(result.password);
                }
                if(!result){
                    reject();
                }
            })
        })
        .then((password) => {
            new Promise((resolve, reject) => {
                bcrypt.compare(req.body.password, password, function(err, result) {
                    if(err){
                        reject();
                    } if(result) {
                        resolve();
                    } if(!result){
                        reject();
                    }
                });
            })
            .then(() => {  
                res.send({ token:token })
            })
            .catch(() => {
                res.status(500).send({ message:'Ошибка аунтефикации' })
            })
        })
        .catch(() => {
            res.status(500).send({ message:'Ошибка аунтефикации' })
        })
    })

    app.post('/checkToken', jsonParse, (req, res) => {
        if(req.body.token === token){
            res.status(200);
        } else {
            res.status(500).send({message:'Войдите в аккаунт чтобы писать статьи'});
        }
    })
    
    app.post('/addArticle', jsonParse, (req, res) => {
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
    })

    app.get('/getArticleList', jsonParse, (req, res) => {
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
    })

    app.post('/getContent', jsonParse, (req, res) => {
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
    })
    app.listen(9000);
})
.catch(() => {
    process.exit(1);
})