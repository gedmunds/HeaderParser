// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

var SendOut = function(address, language, software){
  this.ipAddress = address;
  this.language = language;
  this.software = software
}
var constant = "https://ivory-output.glitch.me/api/whoami"

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get("/api/whoami", function (request, response){
  var address = request.headers["x-forwarded-for"].split(',')[0];
  var lang = request.headers["accept-language"].split(',')[0];
  var str = request.headers["user-agent"]
  var soft = str.split('(')[1].split(')')[0]
  var gift = new SendOut(address, lang, soft);
  response.send(gift);
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
