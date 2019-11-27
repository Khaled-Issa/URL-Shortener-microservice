const express = require('express');
var app= express();

const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(cors());




app.listen(process.env.Port || 3000, function(){
    console.log("Everything is working");
})


