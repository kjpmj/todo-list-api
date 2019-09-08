const mongoose = require('mongoose');

// 스키마 정의
const todoSchema = new mongoose.Schema({
  id : mongoose.Schema.Types.ObjectId,
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
todoSchema.statics.findOneByTodoid = function(_id) {
  return this.findOne({_id})
}

// Update by todoid
todoSchema.statics.updateByTodoid = function(_id, payload) {
  return this.updateOne({_id}, payload, {new : true});
}

// Delete by todoid
todoSchema.statics.deleteByTodoid = function(_id) {
  return this.remove({_id})
}

// Create Model and Export
module.exports = mongoose.model('Todo', todoSchema);