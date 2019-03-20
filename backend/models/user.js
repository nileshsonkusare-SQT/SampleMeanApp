const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;
//const bcrypt = require('bcryptjs');
//const SALT_WORK_ITERATION = 10;


// Define collection and schema for User
let User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
    collection: 'user',
    versionKey: false
  });

User.plugin(mongoosePaginate);

// User.pre('save', function (next) {
//   let user = this;

//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) return next();

//   // generate a salt
//   bcrypt.genSalt(SALT_WORK_ITERATION, function (err, salt) {
//     if (err) return next(err);

//     // hash the password using our new salt
//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err) return next(err);

//       // override the cleartext password with the hashed one
//       user.password = hash;
//       console.log("Encrypted password" + hash);
//       next();
//     });
//   });


// });

// User.methods.verifyPassword = function (passwordInput, callback) {
//   bcrypt.compare(passwordInput, this.password, function (err, isMatch) {
//     if (err) return callback(err);
//     callback(null, isMatch);
//   });
// };

module.exports = mongoose.model('User', User);