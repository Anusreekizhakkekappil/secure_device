const express = require("express");
const router = express.Router();

router.post('/public/index.html', (req, res) => {
    let { name, password } = req.body;
    username = name.trim();
    password = password.trim();

    User.findOne({ $or: [{ name: username }, { password: password }] })
        .then(user => {
            if (user) {
                alert("Successful");
            } else {
                res.json({
                    message: 'No user found!'
                })
            }
        })

})


/*const loginCheck = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

}*/