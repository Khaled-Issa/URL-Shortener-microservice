//structure of the shorURL document

//require mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({

    originalUrl: String,
    shortenedUrl: String


}); ({ timestamps: true});

const ModelClass = mongoose.model('shortUrl', urlSchema);

module.exports = ModelClass;