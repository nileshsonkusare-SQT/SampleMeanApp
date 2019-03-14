const express = require("express");
const router = express.Router();

var StudentsRoutes = require("./api/student.route");


router.use('/student', StudentsRoutes);

module.exports = router;