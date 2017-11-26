const http = require("http"),
      url = require("url"),
      fs = require("fs"),
      read = require("./read"),
      express = require("express");

const hostname = "127.0.0.1";
const port = 3000;

let serving_data = {};

const app = express();
//app.set("view engine","ejs")
app.set("view engine","pug")

app.get("/api/", (request, response) => {
  response.statusCode=200;
  response.json(serving_data.data);
});

app.get("/api/s/:index", (request, response) => {
  let index = request.params.index;
  response.statusCode=200;
  response.json(serving_data.data[parseInt(index)]);
});


app.get("/about", (request, response) => {
  response.statusCode=200;
  response.end("video course content");
})

app.get("/", (request, response) => {
  response.render("index", {title:"The death of the Sumo", message:"Here you view the charging location"})
});

app.get("/charging", (request, response) => {
  response.render("charging", serving_data)
})

app.get("*", (request, response) => {
  response.statusCode = 404;
  response.end("Not found");
})


let listen = new Promise(function(resolve, reject){
  try{
       app.listen(port, hostname, () =>{
       resolve(`Server running at http://${hostname}:${port}/`)   
      })
  } catch(error){
      reject(error);
  }       
})

read("charging_locations.json").then ((data) => {
  serving_data = JSON.parse(data);

  return listen;
}).then((message) => console.log(message)).catch((error) => console.log(error));

async function start(){
  try{
    serving_data = await read("charging_locations.json");
    serving_data = JSON.parse(serving_data);
    console.log(await listen);
  }catch(error){
    console.error(error);
  }
  return serving_data;
}
  start().then((data) => console.log(data));

