const express = require('express');
const app = express();
const fs = require('fs');
const user = require('../../user');

app.get('/getAvatar', (req, res) => {
    if(user.avatar){
        if(fs.existsSync('/home/gosha/home/uploads/'+user.avatar)){
            res.writeHead(200, {
                'Content-Type': 'image/png'
            });
            const readFile = fs.createReadStream('/home/gosha/home/uploads/'+user.avatar);
            readFile.pipe(res);
        } else {
            res.status(500).send({message:"Ошибка"});
        }
    } else {
        res.status(500).send({message:"Ошибка"});
    }
})

module.exports = app;