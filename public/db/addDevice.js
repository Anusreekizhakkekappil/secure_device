/*let express = require("express");
const app = express();
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


//mongoose.connect("mongodb+srv://anu:root@cluster0.ymq1k.mongodb.net/device", { useNewUrlParser: true }, { useUnifiedTopology: true })

app.get("/device", function(req, res) {
    res.sendFile(__dirname + "/public/device.html")
})


const deviceSchema = {
    device: String,
    IP: Number
}

const Device = mongoose.model("Device", deviceSchema);


app.post("/public/device.html", function(req, res) {
        let newDevice = new Device({
            device: req.body.devicename,
            ip: req.body.ip
        });
        newDevice.save();
        res.redirect("/public/device.html");
    })
    //Devices*/