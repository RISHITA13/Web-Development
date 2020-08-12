//jshint esversion:6

// To require express module
// Set express as Node.js web application
// server framework.
// To install express before using it as  an application server by using "npm install express" command.
const express = require("express");
// Body-parser is which allows express to read the body and then parse that into a Json object that we can understand.
const bodyParser = require("body-parser");
// To require ejs module
const ejs = require("ejs");

// Load the full build.Lodash helps programmers write more concise and easier to maintain JavaScript code.
const _ = require('lodash');


 // To add content paragraphs
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// To initialize express app
const app = express();
// Set EJS as templating engine
app.set('view engine', 'ejs');
// tells the system that you want json to be used.
app.use(bodyParser.urlencoded({extended: true}));
// The parameter we pass to the express.static function is the name of the directory we want Express to serve files from, in our case it’s public.
app.use(express.static("public"));

// A global container to store each of the posts when we compose a new blog post.
let posts = [];


// The function handles GET requests to the / route i.e home route with a callback function.
app.get("/",function(req,res){
  // Renders a view and sends the rendered HTML i.e ".ejs" file string to the / route through app.get.
  res.render("home", {
// pass a local variable to the view and sends the rendered HTML.
    StartingContent: homeStartingContent,
    posts: posts
  });

});

 // inserting the about page
app.get("/about",function(req,res){
  res.render("about",{
    // pass a local variable to the view and sends the rendered HTML.
    AContent: aboutContent
  });
});
// inserting the contact page
app.get("/contact",function(req,res){
  res.render("contact",{
    // pass a local variable to the view and sends the rendered HTML.
    ConContent: contactContent
  });
});

// inserting the compose page to add new blog posts.
app.get("/compose",function(req,res){
// Renders a view and sends the rendered HTML i.e ".ejs" file string to the / route through app.get.
  res.render("compose");
});


// To store the inputs entered in compose.
app.post("/compose",function(req,res){

  const post= {
    // to store the title and content in seperate constants.
    title: req.body.NewArticle,
    content: req.body.postBody
  };
// Pushing the element into the array
  posts.push(post);
  // to redirect to home page
res.redirect("/");
});

// To get the new page for each blog post.
app.get("/posts/:postName",function(req,res){
  // req.params is an object containing parameter values parsed from the url path.
  // _.lowerCase is a function of lodash to convert the postName to lowercase in the URl path by req.params.
  const requestedTitle=_.lowerCase(req.params.postName);
// It will loop through all of the posts inside the array and for each post it is going to save into a variable called storedTitle.
posts.forEach(function(post){
  const storedTitle=_.lowerCase(post.title);
// Checks if the title is equal to the url link generated then creates a new page for the blog post.
  if(storedTitle===requestedTitle){
// Renders a view and sends the rendered HTML i.e "post.ejs" file string to the / route through app.get.
    res.render("post",{
      // Stores the title and content and sends it in the new blog post page.
      title: post.title,
      content: post.content
    });
  }

});

});



// app.listen tells it to listen on a specific port i.e. 3000 for any HTTP requests that are sent to our server.
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
