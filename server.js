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
app.get('/Books-mainpage', (req, res)=>{
    res.render('Books-mainpage.ejs')// change to a new file!!
 });


app.get('/allbooks', async (req, res)=>{
    const allBooks = await Book.find()
    res.render('all-books.ejs', {allBooks: allBooks})
});


app.get('/books/new', (req, res)=> {
    res.render("new.ejs")
});


app.post('/allbooks', async (req, res)=>{
    const newBook = await Book.create({
        title: 'Dune',
        author:['Frank'],
        publishDate :'10-10-1965',
        genre:['fiction', 'science'],
        inStock: true,
        rating: 4.8,
    })
    res.redirect('/Books-mainpage')
});





app.get('/books/:id', async (req, res)=> {
    const findBookById = await Book.findById(req.params.id)
    res.render('show-book.ejs', { book: findBookById })
})


//GET	/plants/:id/edit	Edit	Shows a form to edit an existing plant
app.get('/books/:id/edit', async (req, res)=> {
    const findBookByIdAndEdit = await Book.findById(req.params.id)
        console.log(findBookByIdAndEdit)

    res.render('edit-books.ejs', { book: findBookByIdAndEdit})
})


app.put('/books/:id', async (req, res)=>{
    const updatedBooks = await Book.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/allbooks')
})

app.delete('/books/:id', async (req, res)=>{
    const deletedBooks = await Book.findByIdAndDelete(req.params.id)
    res.redirect('/allbooks')
})

























app.listen(3000,()=>{
    console.log("Listening on port " + 3000)
}) // Listen on port 3000
