const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  usertype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usertypes',
    required: true
  },
  birthday: {
    type: Date,
    required: true,
    default: Date.now
  },
  budget :{
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});
module.exports = mongoose.model('users', usersSchema);
