exports.Model = require('mongoose').Schema({
    title: String,
    body: String,
    comments: [{ body: String, date: Date }]
});
