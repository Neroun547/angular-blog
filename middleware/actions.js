const express = require('express');
const app = express();
//Article worker
const addArticle = require('../actions/article-worker/add-article');
const getArticleList = require('../actions/article-worker/get-article-list');
const getContent = require('../actions/article-worker/get-content');
const searchArticles = require('../actions/article-worker/searchArticles');
//Check password
const checkPassword = require('../actions/check-password/check-password');
//Check token
const checkToken = require('../actions/check-token/check-token');
//Login
const login = require('../actions/login/login');
//Register
const register = require('../actions/register/register');
//User settings worker
const activeChange = require('../actions/user-settings-worker/active-change');
const changeParam = require('../actions/user-settings-worker/change-param');
const userInfo = require('../actions/user-settings-worker/user-info');
const addAvatar = require('../actions/user-settings-worker/add-avatar');
const confirmEmail = require('../actions/user-settings-worker/confirm-email');
const confirmPassword = require('../actions/user-settings-worker/confirm-password');
//Get avatar
const getAvatar = require('../actions/get-avatar/get-avatar');


app.use(addArticle)
app.use(getArticleList);
app.use(getContent);
app.use(searchArticles);
// /*---------------------------*/
app.use(checkPassword);
// /*---------------------------*/
app.use(checkToken);
/*---------------------------*/
app.use(login);
// /*---------------------------*/
app.use(register);
// /*---------------------------*/
app.use(activeChange);
app.use(changeParam);
app.use(userInfo);
app.use(addAvatar);
app.use(confirmEmail);
app.use(confirmPassword);
// /*---------------------------*/
app.use(getAvatar);

module.exports = app;