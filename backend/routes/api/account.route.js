const express = require("express");
const router = express.Router();
const AccountController = require("../../controller/account.controller");

// Map each API to the Controller Functions
router.post("/Signup", AccountController.registerUser);

module.exports = router;