const express = require("express");
const router = express.Router();

const verifytoken = require('../auth/verifytoken');
const StudentsRoute = require("./api/student.route");
const UsersRoute = require("./api/user.route");
const AccountRoute = require("./api/account.route");

router.use('/student', StudentsRoute);
router.use('/user',  UsersRoute);
router.use('/account', AccountRoute); // This api can access without token.

module.exports = router;