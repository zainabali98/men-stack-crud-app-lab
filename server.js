// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const morgan = require("morgan")
const methodOverride = require("method-override")

const Book = require('./models/Book')












// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride("_method")); // Changes the method based on the ?_method
app.use(morgan("dev")) // logs the requests as they are sent to our sever in the terminal



async function conntectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}
conntectToDB()







// Routes go here

app.get('/new', (req, res)=> {
    res.render("new.ejs")
});


app.get('/Books-mainpage', (req, res)=>{
    res.render('Books-mainpage.ejs')// change to a new file!!
 });
 
app.get('/allbooks', (req, res)=> {
    res.render("all-books.ejs")
});


app.post('/allbooks', async (req, res)=>{
    const newBook = await Book.create(req.body)
    res.redirect('/Books-mainpage')
});




app.listen(3000,()=>{
    console.log("Listening on port " + 3000)
}) // Listen on port 3000
