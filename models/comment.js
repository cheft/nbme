exports.Model = require('mongoose').Schema({
    post: String,
    body: String,
    date: {type: Date, default: Date.now}
});
