"use strict"

var express=require('express');
var app=express();
var path=require('path');

//Middleware to define static files and folders
app.use(express.static('public'));

app.get('*',function(req,res){
    res.sendfile(path.resolve(__dirname,'public','index.html'));
});

app.listen(3000,function(){
    console.log('App is listening on 3000 port');
});
