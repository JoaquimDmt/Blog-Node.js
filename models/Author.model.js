var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const shortid = require('shortid');

var AuthorSchema = new Schema({
    _id: {
        'type': String,
        'default': shortid.generate
    },
    name: { type : String, required : true},
},{collection:'Authors'});

module.exports = mongoose.model('Authors', AuthorSchema);