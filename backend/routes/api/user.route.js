const express = require("express");
const router = express.Router();
const UserController = require("../../controller/user.controller");

// Map each API to the Controller Functions

router.get("/GetAll", UserController.getAllUsers);

router.get("/:id?", UserController.getUserById);

router.post("/", UserController.createUser);

router.put("/", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

module.exports = router;