let UserService = require('../services/user.service');
const Common = require('../config/common');

let UserController = {
    getAllUsers: async function (req, res, next) {
        try {
            let users = await UserService.getAllUsers();
            return res.status(200).json({ status: 200, data: users, success: true });
        }
        catch (e) {
            return res.status(400).json({ status: 400, message: e.message, success: false });
        }
    },   
    getUserById: async function (req, res, next) {
        try {
            let id = req.params.id;

            let user = await UserService.getUserById(id);

            if (user) {
                return res.status(200).json({ status: 200, data: user, success: true });
            } else {
                return res.status(200).json({ status: 200, message: "User detail not found", success: false });
            }
        }
        catch (e) {
            return res.status(400).json({ status: 400, message: e.message, success: false });
        }
    },
    createUser: async function (req, res, next) {
        try {
            let userModal = {
                name: req.body.name,
                email: req.body.email,
                password: Common.encrypt(req.body.password)
            };

            let createdUser = await UserService.createUser(userModal);

            return res.status(201).json({ status: 201, data: createdUser, success: true });
        }
        catch (e) {
            return res.status(400).json({ status: 400, message: e.message, success: false });
        }
    },
    updateUser: async function (req, res, next) {

        if (!req.body._id) {
            return res.status(400).json({ status: 400., message: "Id must be present", success: false })
        }

        let id = req.body._id;

        try {
            let userModal = {
                _id: id,
                name: req.body.name,
                email: req.body.email
            };

            let updatedUser = await UserService.updateUser(id, userModal);

            return res.status(200).json({ status: 200, data: updatedUser, success: true });
        }
        catch (e) {
            return res.status(400).json({ status: 400, message: e.message, success: false });
        }
    },
    deleteUser: async function (req, res, next) {
        try {
            let id = req.params.id;

            let deletedUser = await UserService.deleteUser(id);

            if (deletedUser) {
                return res.status(200).json({ status: 200, success: true });
            } else {
                return res.status(200).json({ status: 200, message: "User detail not found", success: false });
            }
        }
        catch (e) {
            return res.status(400).json({ status: 400, data: deletedUser, message: e.message, success: false });
        }
    }
}

module.exports = UserController;
