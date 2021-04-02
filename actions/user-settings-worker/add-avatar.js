const express = require('express');
const app = express();
const multer = require('multer');
const connection = require('../../db-connect/connect');
const user = require('../../user');
const fs = require('fs');
let avatarName;

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        avatarName = Date.now() + file.originalname;
        avatarName = avatarName.replace(/\s/g, '');
        cb(null, avatarName);
    }
});

const fileFilter = (req, file, cb) => {
  
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        fs.unlink('/home/gosha/home/uploads/'+user.avatar, (err) => {
            cb(null, true);
        });
    }
    else{
        cb(null, false);
    }
 }

app.use(multer({storage:storageConfig, fileFilter:fileFilter}).single("filedata"));
app.post('/addAvatar', (req, res) => {
    if(req.file.size > 5000000){
        res.status(500).send({message:"Картинка слишком много весит"})
    } else {
        connection(function(err, client) {
            if(err){
                res.status(500).send({message:"Ошибка"})
            } else {
                const db = client.db('blog_angular');
                const collectionUsers = db.collection('users');
                let filedata = req.file;
                if(!filedata){
                    res.status(500).send({message: "Ошибка при загрузке файла" });
                }
                else {
                    new Promise((resolve, reject) => {
                        collectionUsers.updateOne({email:user.email}, {$set:{avatar:avatarName}}, (err) => {
                            if(err){
                                reject();
                            } else {
                                resolve();
                            }
                        })
                    })
                    .then(() => {
                        user.avatar = avatarName;
                        res.send({message: "Файл загружен"});
                    })
                    .catch(() => {
                        res.status(500).send({ message: "Ошибка" })
                    })
                }
            }
        }) 
    } 
});

module.exports = app;