var jwt = require('jsonwebtoken');
var UserService = require('../services/user.service')


let auth = async function (req, res) {
    let email = req.body.email;
    let password = req.body.password;

    let user = await UserService.getUserLogin(email, password);

    console.log(user);

    if (user && user != null) {
        const expiresIn = 86400; // expires in 24 hours

        //Generate Token.
        var token = jwt.sign({ email: user.email, password : password }, process.env.SECRET_KEY, {
            expiresIn: expiresIn 
        });

        res.json({
            success: true,
            access_token: token,
            expiresIn: expiresIn,
            data: user
        });
    } else {
        res.json({
            success: false,
            message: "Invalid email or password."
        });
    }
}

module.exports = auth;