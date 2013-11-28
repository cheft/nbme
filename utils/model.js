var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

exports.mongoose = mongoose;

exports.Schema = Schema;

exports.id = {
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId
};
