import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  comment: String,
  fountain_id:{type:Schema.types.ObjectId, ref:'Founatin'},
  postedBy:{type:Schema.types.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Comment', CommentSchema);
