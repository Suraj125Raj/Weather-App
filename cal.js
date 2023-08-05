const express = require ("express");

const bodyParser = require ("body-parser");
const https = require ("https");

const app = express();
 app.use(bodyParser.urlencoded({extended:true}));

 app.get("/",function(req,res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=06b6ae92f98a98c9e068a11f2664c212";
    https.get(url,function(response){

        console.log(response.statusCode);

        response.on("data",function(data){

            const weatherData = JSON.parse(data)
            console.log(weatherData);
        });
        res.send("Server run");
    });
    
 });


 app.post();


 app.listen(3000, function(req,res){
    console.log("Server running on port 3000");
 });