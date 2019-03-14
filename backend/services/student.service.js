// Require Student model in student controller
let Student = require('../models/student');

let StudentService = {
    getAllStudents: async function () {
        try {
            let students = await Student.find({});
            return students;
        }
        catch (e) {
            throw Error('Error while get all students');
        }
    },
    getStudentById: async function (id) {
        try {
            let student = await Student.findById(id);
            return student;
        } catch (e) {
            throw Error('Error while get student by id');
        }
    },
    createStudent: async function (studentModal) {
        try {            
            let student = new Student(studentModal);
            return await student.save();
        } catch (e) {
            throw Error('Error while creating student');
        }
    },
    updateStudent: async function (id, student) {
        try {
            let oldStudent = await Student.findById(id);

            if (!oldStudent) {
                throw Error('Student details not exist');
            }

            //Edit the Student Object
            oldStudent.firstname = student.firstname;
            oldStudent.lastname = student.lastname;
            oldStudent.mobileno = student.mobileno;
            oldStudent.address = student.address;
            oldStudent.birthdate = student.birthdate;

            console.log(oldStudent);

            try {
                return await oldStudent.save();
            } catch (e) {
                throw Error('Error while updating student');
            }

        } catch (e) {
            throw Error('Error while fetching student details for update');
        }
    },
    deleteStudent: async function (id) {
        try {
            let deletedStudent = await Student.findOneAndDelete({ _id : id });
            return deletedStudent;
        } catch (e) {
            throw Error('Error while deleting student');
        }
    },
}

module.exports = StudentService;