// to use the package mongoose
 const mongoose = require('mongoose');
// add the connection(to mongodb) url which will specify the port where we can access our MongoDB database server .
// and then name or specify the database we want to create or connect to.

mongoose.connect(
  "mongodb://localhost:27017/fruitsDB"
  , { useNewUrlParser: true, useUnifiedTopology: true }
);

// create new schema - a blueprint or the structure of our data that we're going to save into our MongoDB database.
const fruitSchema = new mongoose.Schema({
   name: String,
   rating: Number,
   review: String
});
// We'll have the fruits each as individual records or documents,they'll be saved into a collection called fruits
//  inside database fruitsDB.
// we use schema to create mongoose model.
const Fruit=mongoose.model("Fruit",fruitSchema);
// Fruit is name of collection inside string, mongodb turns singular form into plural form.
// New Fruit document.
const fruit = new Fruit ({
  name: "Apple",
  rating: 7,
  review: "soft sweet"
});
// this calls the save method in mongoose to save the fruit document
// into a fruit collection inside the fruitsDB.
// fruit.save();

// Creating new schema to save persons name and age
const personSchema = new mongoose.Schema ({
  name: String,
  age: Number
});

const Person= mongoose.model("Person",personSchema);

const person= new Person({
  name:"John",
  age: 43
});

person.save();

// Creating new 3 fruits into the collection fruitsDB
// const kiwi=new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "okay okay"
// });
// const orange=new Fruit({
//   name: "Orange",
//   score: 8,
//   review: "okay"
// });
// const banana=new Fruit({
//   name: "Banana",
//   score: 0,
//   review: "Yuck"
// });


// Fruit.insertMany([kiwi,orange,banana],function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//   console.log("sucessfully");
//   }
// });

Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }else{
    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});
