const express = require("express");
const router = express.Router();
const StudentController = require("../../controller/student.controller");

// Map each API to the Controller Functions

router.get("/GetAll", StudentController.getAllStudents);

router.get("/:id?", StudentController.getStudentById);

router.post("/", StudentController.createStudent);

router.put("/", StudentController.updateStudent);

router.delete("/:id", StudentController.deleteStudent);

module.exports = router;