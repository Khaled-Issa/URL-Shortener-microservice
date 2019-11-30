const express = require('express');
var app= express();

const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname+'/public'));

app.get('/new/:url(*)',function(req,res,next){
    var url = req.params.url;

    return res.json({url});
});





app.listen(process.env.Port || 3000, function(){
    console.log("Everything is working");
})


