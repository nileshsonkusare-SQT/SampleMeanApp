let User = require('../models/user');
let UserService = {
    getAllUsers: async function () {
        try {
            let users = await User.find({});
            return users;
        }
        catch (e) {
            throw Error('Error while get all users');
        }
    },
    getUserLogin: async function (email, password) {
        try {
            let user = await User.findOne(
                { email: email, password: password },
                { name: 1, email: 1, _id: 0 });
            
            return user;
            
            // let userModal = {};

            // return new Promise((resolve, reject) => {

            //     User.findOne({ email: email }, function (err, user) {
            //         if (err) reject(err);

            //         if (user) {

            //             user.verifyPassword(password, function (err, isMatch) {
            //                 if (err) reject(err);

            //                 if (isMatch == true) {
            //                     userModal = {
            //                         name: user.name,
            //                         email: user.email
            //                     }
            //                     resolve(userModal);
            //                 } else {
            //                     resolve(null);
            //                 }
            //             });
            //         } else {
            //             resolve(null);
            //         }
            //     })
            // });
        }
        catch (e) {
            throw Error('Error while get user login');
        }
    },
    getUserById: async function (id) {
        try {
            let user = await User.findById(id);
            return user;
        } catch (e) {
            throw Error('Error while get user by id');
        }
    },
    getUserByEmail: async function (email) {
        try {
            let user = await User.findOne({ email: email });
            return user;
        } catch (e) {
            throw Error('Error while get user by email');
        }
    },
    createUser: async function (userModal) {
        try {
            let user = new User(userModal);
            return await user.save();
        } catch (e) {
            throw Error('Error while creating user');
        }
    },
    updateUser: async function (id, user) {
        try {
            let oldUser = await User.findById(id);

            if (!oldUser) {
                throw Error('User details not exist');
            }

            //Edit the User Object
            oldUser.name = user.name;
            oldUser.email = user.email;

            console.log(oldUser);

            try {
                return await oldUser.save();
            } catch (e) {
                throw Error('Error while updating user');
            }

        } catch (e) {
            throw Error('Error while fetching user details for update');
        }
    },
    deleteUser: async function (id) {
        try {
            let deletedUser = await User.findOneAndDelete({ _id: id });
            return deletedUser;
        } catch (e) {
            throw Error('Error while deleting user');
        }
    }
}

module.exports = UserService;