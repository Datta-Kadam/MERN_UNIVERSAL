var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');
var Books=require('./models/books.js');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//APIS
var mongoose = require('mongoose');
//LOCA MONGO DB
//mongoose.connect('mongodb://localhost:27017/booksshop');

//MLAB DB
mongoose.connect('mongodb://bookshop:bookshop@ds045521.mlab.com:45521/bookshop');


var db=mongoose.connection;
db.on('error',console.error.bind(console,'#MongoDB -connection error'));

//-->>> SET UP SESSIONS <<<-----
app.use(session({
  secret:'mySecretString',
  saveUninitialized:false,
  resave:true,
  cookie:{maxAge:1000*60*60*24*2},
  store:new MongoStore({mongooseConnection: db, ttl:2*24*60*60})
}));

//SAVE TO SESSIONS

app.post('/cart',function(req,res){
  var cart=req.body;
  console.log('CART ===>>',cart);
  req.session.cart=cart;
  req.session.save(function(err){    
    if(err) {
      console.log('Error occured',err);
    }
    res.json(req.session.cart);
  })
});
//GET CART 
app.get('/cart',function(req,res){
  if(typeof req.session.cart!=='undefined'){
    console.log("SERVER CART SESSION DATA",req.session.cart);
    res.json(req.session.cart);
  }
});
// -->>> END SESSION SET UP <<<<----

// POST BOOKS API
app.post('/books',function(req,res){
  var book=req.body;
    Books.create(book,function(err,books){
    if(err){
      console.log('Error occured',err);
    }
    //res.contentType('applcation/json');
    res.json(books);
  })
});
//GET APIS
app.get('/books',function(req,res){
  var book=req.body;  
  Books.find(book,function(err,books){
    if(err){
      console.log('Error occured',err);
    }
    res.json(books);
  })
});

//DELETE APIS
app.delete('/books/:_id',function(req,res){
  var query={_id:req.params._id};
  Books.remove(query,function(err,books){
    if(err){
      console.log('Error occured',err);
    }
    res.json(books);
  })
});

//GET IMGAGES FROM images directory
app.get('/images',function(req,res){
  const imgFolder=__dirname+'/public/images';
  //REQUIRE A FILESYSTEM
  var fs= require('fs');
  //READ ALL FILES IN A DIRECTORY
  fs.readdir(imgFolder,function(err,files){
    if(err){
      return console.log(err);
    }
    const filesArray=[];

    files.forEach(function(file){
      filesArray.push({name:file});
    })
    //SEND THE JSON RESPONSE
    res.json(filesArray);
  });
});
//END APIS

//API Server listening on 3001 port
app.listen(3001,function(err){
  if(err){
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
});