const express=require("express");
const https =require("https");
const bodyParser = require("body-parser");

const app= express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
const query =req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=4ab7fa0eea5cdf18de9b6e3c9fd7205d&units=metric";

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData =JSON.parse(data);
      const temp = weatherData.main.temp;
const descrip = weatherData.weather[0].description;
const icon=weatherData.weather[0].icon;
const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
res.writeHead(200, {'Content-Type': 'text/html'});
   res.write("<h3>the weather is currently " +descrip + " </h3>");
   res.write("<img src =" + imageUrl + ">");

res.write(" <h1>the temp in "+query+" is" + temp + " degree celsius.</h1>");
res.send();
});
  });
});



app.listen(process.env.PORT || 3000, function(){
  console.log("server is on 3000");
});
