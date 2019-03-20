let UserService = require('../services/user.service');
const Common = require('../config/common');

let AccountController = {
    registerUser: async function (req, res, next) {
        try {

            //Check email address exist.
            let userEmailExist = await UserService.getUserByEmail(req.body.email);

            if (!Boolean(userEmailExist)) {

                let userModal = {
                    name: req.body.name,
                    email: req.body.email,
                    password: Common.encrypt(req.body.password)
                };

                let createdUser = await UserService.createUser(userModal);

                return res.status(201).json({ status: 201, data: createdUser, success: true });
            } else {
                return res.status(400).json({ status: 400, message: "Email already in use.", success: false });
            }
        }
        catch (e) {
            return res.status(400).json({ status: 400, message: e.message, success: false });
        }
    }
}

module.exports = AccountController;
