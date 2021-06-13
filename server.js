let express = require("express");
const app = express();
var router = express.Router();

var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const { stringify } = require("querystring");

const loginAuth = require("./public/controller/authCon.js");
const addDev = require("./public/db/addDevice")
const { decodeBase64 } = require("bcryptjs");

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
app.get("/login", function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
})
app.get("/deviceEntry", function(req, res) {
    res.sendFile(__dirname + "/public/device.html")
})
app.get("/devices", function(req, res) {
    res.sendFile(__dirname + "/public/showDevice.html")
})
app.post("/", function(req, res) {
    console.log(req);
    let newSecure = new Secure({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    });
    newSecure.save();
    res.redirect('/');
})

//Devices
const deviceSchema = {
    email: String,
    device: String,
    IP: Number
}

const Device = mongoose.model("Device", deviceSchema);

app.post("/deviceEntry", function(req, res) {
    console.log(req.body);
    let newDevice = new Device({
        email: req.body.email,
        device: req.body.devicename,
        IP: req.body.ip
    });
    newDevice.save();
    res.redirect('/deviceEntry');
})

app.post('/devices', function(req, res) {
        var email = req.body.email;
        //console.log(req.body);

        Device.find({ email: email }, function(err, document) {
            console.log(document);
            if (err) {
                console.log("Login Failed");
            } else {
                if (document) {
                    {

                        console.log(document);
                        res.jsonp({ document })
                            //res.redirect('/devices');
                    }
                } else {
                    console.log("data Not found");
                    res.jsonp({ message: "no device found" })
                        //res.redirect('/deviceEntry');
                }
            }
        })

    })
    //Devices

//login validation

app.post('/login', function(req, res) {
    var name = req.body.username;
    var password = req.body.password;
    //console.log(req.body);

    Secure.findOne({ name: name, password: password }, function(err, document) {
        console.log(document);
        if (err) {
            console.log("Login Failed");
        } else {
            if (document) {
                {
                    if (document._id) {
                        //console.log("Login Successful");
                        res.redirect('/deviceEntry');
                    } else {
                        // console.log("User Not found");
                        //res.jsonp({success : false})
                        res.redirect('/login');
                    }
                }
            } else {
                // console.log("User Not found");
                //res.jsonp({success : false})
                res.redirect('/login');
            }
        }
    })

})

//login validation

/*app.post("/public/device.html", function(req, res) {
        db.devices.insertOne({
            device: req.body.devicename,
            ip: req.body.ip
        })
    })*/
//Devices


//login validation
/*app.post('/login', function(req, res) {
    var name = req.body.username; 
    var password = req.body.password;
    console.log(req);
    User.findOne({ $or: [{ name: name }, { password: password }] })
        .then(User => {
            if (User) {
                console.log("Successful");
            } else {

                console.log("No user found!");

            }
        })

})*/

//login validation

//app.use('/api', loginAuth);
//app.get('/public/db/addDevice.js'.router);
//app.post(router);

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