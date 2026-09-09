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
        required:false,
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
    rating:{
        type:Number,
        required:false,
        min:0,
        max:10,
    },
}, {timestamps:true});

const Book = mongoose.model('Book', bookSchema)
module.exports = Book


