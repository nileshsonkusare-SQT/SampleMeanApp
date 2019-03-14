const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;

// Define collection and schema for Student
let Student = new Schema({
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    mobileno: {
      type: String
    },
    address: {
      type: String
    },
    birthdate: {
      type: Date
    }
  },{
      collection: 'student',
      versionKey: false     
  });

  Student.plugin(mongoosePaginate)
  
  module.exports = mongoose.model('Student', Student);