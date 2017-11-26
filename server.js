const http = require("http"),
	url = require("url"),
	fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

let serving_data = {};

const handlers = [];

handlers["/"] = (request, response) => {
  response.statusCode=200;
  response.setHeader("Content-type", "application/json");
  response.end(JSON.stringify(serving_data.data));
}

handlers["/first"] = (request, response) => {
  response.statusCode=200;
  response.setHeader("Content-type", "application/json");
  response.end(JSON.stringify(serving_data.data[0]));
}

handlers["/second"] = (request, response) => {
  response.statusCode=200;
  response.setHeader("Content-type", "application/json");
  response.end(JSON.stringify(serving_data.data[1]));
}

handlers["/about"] = (request, response) => {
  response.statusCode=200;
  response.setHeader("Content-type", "application/json");
  response.end("video course content");
}



const server = http.createServer((request, response) => {
  var pathname = url.parse(request.url, true).pathname;
 
  if(handlers[pathname]){
    handlers[pathname](request, response);
  }else{
    response.statusCode = 404;
    response.end("Not found");
  }

})

fs.readFile("charging_locations.json", "utf-8", (err, data) => {
  if(err) return;
  serving_data = JSON.parse(data);
  server.listen(port, hostname, () =>{
  console.log(`Server running at http://${hostname}:${port}/`)   
  })
})

module.exports = {
  handlers: handlers,
  data: serving_data.data
};

