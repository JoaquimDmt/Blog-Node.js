var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const shortid = require('shortid');

var CategorySchema = new Schema({
    _id: {
        'type': String,
        'default': shortid.generate
    },
    title: { type : String, required : true},
},{collection:'Categories'});

module.exports = mongoose.model('Categories', CategorySchema);