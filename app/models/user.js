import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username:String,
  password:String,
  email:String,
  visits:[{type:Schema.Types.ObjectId, ref:'Fountain'}]
});

module.exports = mongoose.model('User', UserSchema);
