//jshint esversion:6
//Creating four constants and requiring all of those modules that we installed.
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

//creating a new app instant using express
const app = express();

//setting our view engine to use EJS our templating engine.
app.set('view engine', 'ejs');

//use body-parser in order to pass our requests
app.use(bodyParser.urlencoded({
  extended: true
}));
//use the public directory to store our static files such as images and CSS code.
app.use(express.static("public"));

//TODO

//Set up mongoDB and connect to the usual mongoDB location which is mongodb://localhost:27017 i.e. default port .
//with adding a specified database name.
//it allow Mongoose to connect to our local MongoDB instance.
mongoose.connect("mongodb://localhost:27017/wikiDB",
 { useNewUrlParser: true, useUnifiedTopology: true});

//Create new schema . const and 2 fields title and content.

const articleSchema = {
  title:String,
  content: String
}

//create a model const
const Article = mongoose.model("Article",articleSchema);
///////REquest targeting all articles
app.route("/articles").
get(function(req,res){
  Article.find(function(err,foundArticles){
if(!err){
    res.send(foundArticles);
}
else{
  res.send(err);
}
  });
})
.post(function(req,res){
  //set the data based on the data we received through the Post request.

const newArticle = new Article({
  title: req.body.title,
  content: req.body.content
});
newArticle.save(function(err){
  if(!err){
    res.send("Successfully added a new article");
  }else{
    res.send(err);
  }
});
})
.delete(function(req,res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Successfully");
    }
    else
    {res.send(err);
    }
  });
});

/////request targeting specific article.

app.route("/articles/:articleTitle")

.get(function(req,res){
  Article.findOne({title: req.params.articleTitle},function(err,foundArticle){
    if(foundArticle){
      res.send(foundArticle);
    }else
    {
    res.send("No articles found! RECHECK");
    }
  })
})
.put(function(req,res){
  Article.update(
    {title: req.params.articleTitle},
    {title:req.body.title, content:req.body.content},
    {overwrite: true},
    function(err){
      if(!err){res.send("Updated Article");
    }
    }
);
})

.patch(function(req,res){
    Article.update(
    {title: req.params.articleTitle},
    {$set:req.body},
    function(err){
      if(!err){
        res.send("Successfully");
      } else{
        res.send(err);
      }
    }
  );
})
.delete(function(req,res){
  Article.deleteOne(
    {title:req.params.articleTitle},
    function(err){
      if(!err){
        res.send("Success");
      }else{
        res.send(err);
      }
    }
  );
});

//Set up app to listen on port 3000.
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
