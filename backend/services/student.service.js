let Student = require('../models/student');

let StudentService = {
    getAllStudents: async function (filtertext, page, pagesize, sortcolumn, sortby) {
        try {
            var query = {};            
            var sorDirection = 1;
            var sort = {};

            if (sortby == 'desc') {
                sorDirection = -1;
            } else {
                sorDirection = 1;
            }

            sort[sortcolumn] = sorDirection;

            if (filtertext) {
                let pattern = new RegExp('.*' + filtertext + '.*', "i");
                console.log(pattern);
                query["$or"] = [
                    { firstname: { $regex: pattern } },
                    { lastname: { $regex: pattern } },
                    { mobileno: { $regex: pattern } },
                    { address: { $regex: pattern } },
                ];
            }

            console.log(query);

            var options = {
                page: page, 
                limit: pagesize, 
                sort: sort 
            }

            console.log(options);

            //Using built-in paginate function.
            let students = await Student.paginate(query, options);
            return students;

            /**
               * Response looks like:
               * {
               *   docs: [...] // array of Students
               *   total: 50   // the total number of Students
               *   limit: 10   // the number of Students returned per page
               *   page: 2     // the current page of Students returned
               *   pages: 5    // the total number of pages
               * }
              */
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
            let deletedStudent = await Student.findOneAndDelete({ _id: id });
            return deletedStudent;
        } catch (e) {
            throw Error('Error while deleting student');
        }
    },
}

module.exports = StudentService;