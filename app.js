const express = require("express");
const path = require("path");
const app = express();
//const fs = require("fs");
const Mongooes = require('mongoose');
const bodyparser = require("body-parser");
const { default: mongoose } = require("mongoose");

//Connect to MongoDB
mongoose.connect('mongodb://localhost/contactDance',{usenewUrlParser: true});

const port = 8000;

//Define Mongooes Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
    
  });

const contact = mongoose.model('contact', contactSchema);

//app.use(express.static('static',options))
//Express Specific Stuff
app.use('/static',express.static('static'))//for serving static file
app.use(express.urlencoded({extended:true}));

//PUG SPECIFIC STAFF
app.set('view engine','pug')//set the templates engine as pug
app.set('views',path.join(__dirname,'views'))//set the value directory

//endpoints
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('contact.pug');
});
app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database ");
    }).catch(()=>{
    res.status(400).send("Item was not saved to the data");
    })
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});    