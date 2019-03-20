const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;

// Define collection and schema for Student
let Student = new Schema({
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    mobileno: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    birthdate: {
      type: Date,
      required: true
    },
    createdon: {
      type: Date,
      required: true
    },
    updatedon: {
      type: Date,
      required: false      
    },
  },{
      collection: 'student',
      versionKey: false     
  });

  Student.plugin(mongoosePaginate)
  
  module.exports = mongoose.model('Student', Student);