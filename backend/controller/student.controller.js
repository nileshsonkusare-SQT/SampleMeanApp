let StudentService = require('../services/student.service');

let StudentController = {
    getAllStudents: async function (req, res, next) {
        try {
            let filtertext = req.query.filtertext;
            let page = +req.query.page || 1;
            let pagesize = +req.query.pagesize || 10;
            let sort = req.query.sort;
            let sortby = req.query.sortby;

            let students = await StudentService.getAllStudents(filtertext, page, pagesize, sort, sortby);
            return res.status(200).json({ status: 200, data: students, success: true });
        }
        catch (e) {
            return res.status(400).json({ status: 400, message: e.message, success: false });
        }
    },
    getStudentById: async function (req, res, next) {
        try {
            let id = req.params.id;

            let student = await StudentService.getStudentById(id);

            if (student) {
                return res.status(200).json({ status: 200, data: student, success: true });
            } else {
                return res.status(200).json({ status: 200, message: "Student detail not found", success: false });
            }
        }
        catch (e) {
            return res.status(400).json({ status: 400, message: e.message, success: false });
        }
    },
    createStudent: async function (req, res, next) {
        try {
            let studentModal = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                mobileno: req.body.mobileno,
                address: req.body.address,
                birthdate: req.body.birthdate,
                createdon: new Date()
            };

            let createdStudent = await StudentService.createStudent(studentModal);

            return res.status(201).json({ status: 201, data: createdStudent, success: true });
        }
        catch (e) {
            return res.status(400).json({ status: 400, message: e.message, success: false });
        }
    },
    updateStudent: async function (req, res, next) {

        if (!req.body._id) {
            return res.status(400).json({ status: 400., message: "Id must be present", success: false })
        }

        let id = req.body._id;

        try {
            let studentModal = {
                _id: id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                mobileno: req.body.mobileno,
                address: req.body.address,
                birthdate: req.body.birthdate,
                updatedon: new Date()
            };

            let updatedStudent = await StudentService.updateStudent(id, studentModal);

            return res.status(200).json({ status: 200, data: updatedStudent, success: true });
        }
        catch (e) {
            return res.status(400).json({ status: 400, message: e.message, success: false });
        }
    },
    deleteStudent: async function (req, res, next) {
        try {
            let id = req.params.id;

            let deletedStudent = await StudentService.deleteStudent(id);

            if (deletedStudent) {
                return res.status(200).json({ status: 200, success: true });
            } else {
                return res.status(200).json({ status: 200, message: "Student detail not found", success: false });
            }
        }
        catch (e) {
            return res.status(400).json({ status: 400, data: deletedStudent, message: e.message, success: false });
        }
    },
    dummyStudents: async function (req, res, next) {
        try {

            let startIndex = 1;
            let endIndex = 5000;

            let studentCount = await StudentService.getStudentCount();
            console.log("Student Count : " + studentCount);

            if (studentCount && studentCount > 0) {
                startIndex = (studentCount + 1);
                endIndex = (studentCount + 1) + 5000;
            }

            console.log("Start Index : " + startIndex);
            console.log("End Index : " + endIndex);

            for (var i = startIndex; i <= endIndex; i++) {
                let studentModal = {
                    firstname: `Test_FirstName_${i}`,
                    lastname: `Test_LastName_${i}`,
                    mobileno: `1234567890`,
                    address: `Test_Address_${i}`,
                    birthdate: new Date(1990, 0, 1),
                    createdon: new Date()
                };

                await StudentService.createStudent(studentModal);
            }

            return res.status(201).json({ status: 201, data: "Dummy Data Inserted Successfully.", success: true });
        }
        catch (e) {
            return res.status(400).json({ status: 400, message: e.message, success: false });
        }
    },
}

module.exports = StudentController;
