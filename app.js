const express = require('express');
var app= express();

const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const shortUrl = require('./models/shortUrl');

app.use(bodyParser.json());
app.use(cors());


//connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortUrls')

//allows node to find static content
app.use(express.static(__dirname+'/public'));

app.get('/new/:url(*)',function(req,res,next){
    var url = req.params.url;

    //Regex for url
    var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~$?&//=]*)?/gi;
    
    if(regex.test(url)== true){
        var short= Math.floor(Math.random()*100000).toString();
        var data = new shortUrl({
            originalUrl: url,
            shortenedUrl: short
        });
        
        data.save(function(err){
            if(err){
                return res.send('Error saving to database');
            }
        });

        return res.json(data);
    }
    var data = new shortUrl({
        originalUrl: url,
        shortenedUrl:'Invalid url'
    });

    return res.json(data);
});


//Query database and forward to original url
app.get('/:urlToForward', function(req, res, next){
    var shortenedUrl = req.params.urlToForward;

    shortUrl.findOne({'shortenedUrl': shortenedUrl}, function(err,data){
        if(err) return res.send('Error reading database');
        var re = new RegExp("^(http|https)://", "i");
        var strToCheck = data.originalUrl;
        if(re.test(strToCheck)){
            res.redirect(301,data.originalUrl);
        }
        else{
            res.redirect(301,'http://'+data.originalUrl);
        }
    });
});


app.listen(process.env.Port || 3000, function(){
    console.log("Everything is working");
})


