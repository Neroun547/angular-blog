const nodemailer = require('nodemailer');
const emailPassword = require('../config.json').emailPassword;
const emailAdress = require('../config.json').emailAdress;
const hash = require('../services/hash.service').generateHash;

async function sendMessage(getter, theme, url, text){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailAdress,
            pass: emailPassword
        }
    });
    try {
        await transporter.sendMail({
            from: emailAdress,
            to: getter,
            subject: theme,
            html: `<a href="http://localhost:4200/${url}/${hash()}">${text}</a>`
        });
    }
    catch(e){
        return;
    }   
}

module.exports = { sendMessage };

