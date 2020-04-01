var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const shortid = require('shortid');

var ArticleSchema = new Schema({
    _id: {
        'type': String,
        'default': shortid.generate
    },
    title: { type : String, required : true},
    dateCreated: { type: Date, default: Date.now, required : true },
    content: { type : String, required : true},
    category : { type : String, required : true, ref : 'Categories' },
    author :  { type : String, required : true, ref : 'Authors' },
}, {collection:'Articles'});

module.exports = mongoose.model('Articles', ArticleSchema);