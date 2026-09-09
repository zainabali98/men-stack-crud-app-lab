const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:[String],
        required:false,// use enum here
    },
    publishDate:{
        type:String,
        required:true,
    },
    pages:{
        type:Number,
        required:false,
        min:1
    },
    genre:{
        type:[String],
        required:true,
    },
    inStock:{
        type:Boolean,
        required:false,
    },
}, {timestamps:true});

const Book = mongoose.model('Book', bookSchema)
module.exports = Book


