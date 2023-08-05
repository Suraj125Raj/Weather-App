const express = require ('express');
const https = require ("https"); //native node http module
const bodyParser = require ("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apikey ="06b6ae92f98a98c9e068a11f2664c212"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apikey;
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const icon = weatherData.weather[0].icon
            const weatherDescription = weatherData.weather[0].description
            const imageURL ="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>The temprature in"+query+" is"+temp+"degree celsius</h1>");
            res.write("<p>The weattherv description is around :"+ weatherDescription+"</p>");
            res.write("<img src="+imageURL+">")
            res.send();
        });
    });
});


app.listen(3000, function(){
    console.log("port running 3000");
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const https = require('https');
// const app = express();

// app.use(bodyParser.urlencoded({extended:true}));

// app.get("/",function(req,res){
//     res.sendFile(__dirname+"/index.html");
// });

// app.post("/",function(req,res){
//     const query = req.body.cityName
//     const apikey = "06b6ae92f98a98c9e068a11f2664c212"
//     const unit = "metric"

    

//     const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apikey
//     https.get(url,function(response){
//     console.log(response.statusCode);
//     response.on("data",function(data){
//         const weatherData = JSON.parse(data)
//         const temp = weatherData.main.temp
//         const weeatherDescription = weatherData.weather[0].description
//         const icon = weatherData.weather[0].icon
//         const imageURL ="http://openweathermap.org/img/wn/"+icon+"@2x.png"

//         res.write("<h1>The temprature of "+query+"is :"+temp+"degree celsius</h1>");
//         res.write("<p>The weather condition is"+weeatherDescription+"</p>");
//         res.write("<img src="+imageURL+">");
//         res.send();
//     });
//     });

// });

// app.listen(3000,function(req,res){
//     console.log("Port running on 3000");
// })


