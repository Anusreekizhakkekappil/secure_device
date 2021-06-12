let express = require("express");
const app = express();

var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const { stringify } = require("querystring");

app.use(bodyParser.urlencoded({ extended: true }));

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

mongoose.connect("mongodb+srv://anu:root@cluster0.ymq1k.mongodb.net/secure", { useNewUrlParser: true }, { useUnifiedTopology: true })

//create a data schema
const secureSchema = {
    name: String,
    email: String,
    password: String,
    phone: Number
}

const Secure = mongoose.model("Secure", secureSchema);


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/registration.html")
})

app.post("/", function(req, res) {
    let newSecure = new Secure({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    });
    newSecure.save();
    res.redirect('/');
})


var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

/*app.get("/test", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
});
*/

//socket test
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);

});


http.listen(port, () => {
    console.log("Listening on port ", port);
});

//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();