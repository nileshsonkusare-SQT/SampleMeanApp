const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;

// Define collection and schema for User
let User = new Schema({
    name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    }
  },{
      collection: 'user',
      versionKey: false     
  });

  User.plugin(mongoosePaginate)
  
  module.exports = mongoose.model('User', User);