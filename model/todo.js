const mongoose = require('mongoose');

// 스키마 정의
const todoSchema = new mongoose.Schema({
  id : { type : Number, required : true, unique : true},
  text : { type : String, required : true},
  complete : { type : Boolean, default : false}
},
{
  timestamps : true
});

// document 생성
todoSchema.statics.create = function(payload){
  // this === Model
  const todo = new this(payload);
  // return Promise
  return todo.save();
}

// Find All
todoSchema.statics.findAll = function() {
  // return Promise
  return this.find({});
}

// Find One by todoid
todoSchema.statics.findOneByTodoid = function(id) {
  return this.findOne({id})
}

// Update by todoid
todoSchema.statics.updateByTodoid = function(id, payload) {
  return this.findOneAndUpate({id}, payload, {new : true});
}

// Delete by todoid
todoSchema.statics.deleteByTodoid = function(id) {
  return this.remove({id})
}

// Create Model and Export
module.exports = mongoose.model('Todo', todoSchema);