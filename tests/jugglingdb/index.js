var Schema = require('jugglingdb').Schema;

var dbtype = require('jugglingdb-mongodb')
var db = new Schema(dbtype, {
    // url: 'mongodb://username:password@localhost:27017/jugglingdb'
    url: 'mongodb://localhost:27017/jugglingdb'
});

// var dbtype = require('jugglingdb-mysql')
// var db = new Schema(dbtype, {
//     database: 'jugglingdb',
//     username: 'root'
// });

db.log = function(l) {
    console.log(l);
};

User = db.define('User', {
    name: {
        type: String,
        index: true
    },
    email: {
        type: String,
        index: true
    },
    age: Number,
});

Post = db.define('Post', {
    title: {
        type: String,
        length: 255,
        index: true
    },
    content: {
        type: String
    }
});

User.hasMany(Post);
Post.belongsTo(User);

// db.automigrate(function(){

//     User.create({name: 'chf', email: '7720829@gmail.com', age: 24}, function(e, u) {
//         console.log(e, u);
//         u.posts.create({title: 'test', content: 'Hello World!'}, function(e, p){
//             console.log(e, p);
//         });
//     });

// });

User.find('52cbac24c52551010dcf7a86', function(e, u) {
    Post.all({
        where : {
            userId : u.id
        }
    }, function(err, data) {
        var o = u.toObject();
        o.posts = data;
        //console.log(o);
    })
});

Post.find('52cbac24c52551010dcf7a87', function(e, u) {
    User.find(u.userId, function(err, data) {
        var o = u.toObject();
        o.user = data;
        console.log(o);
    })
});

//console.log(User);

