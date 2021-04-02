const MongoClient = require('mongodb').MongoClient;
const uri = require('../config.json').mongoDbUri;

module.exports = function(callback) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true });
    client.connect(callback)
}

// const db = client.db("blog_angular");
// const collectionUsers = db.collection("users");
// const collectionArticles = db.collection("articles")