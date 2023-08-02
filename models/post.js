const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image : String,
  content : {
    type : String,
    required : true
  },
  category : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Category',
    required : true
  },
  createdAt : {
    type : Date,
    default : Date.now
    },
  updatedAt : {
    type : Date,
    default : Date.now
    }
  }
);
module.exports = mongoose.model('Post', postSchema);
