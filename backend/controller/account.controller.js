let UserService = require('../services/user.service');


let AccountController = {    
    registerUser: async function (req, res, next) {
        try {
            let userModal = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            };

            let createdUser = await UserService.createUser(userModal);

            return res.status(201).json({ status: 201, data: createdUser, success: true });
        }
        catch (e) {
            return res.status(400).json({ status: 400, message: e.message, success: false });
        }
    }
}

module.exports = AccountController;
