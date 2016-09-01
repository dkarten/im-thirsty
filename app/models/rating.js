import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var RatingSchema = new Schema({
  fountain_id:{type:Schema.Types.ObjectId ref:'Fountain'},
  user_id:{type:Schema.Types.ObjectId, ref:'User'},
  temperature:Number,
  stream:Number,
  cleanliness:Number,
  location:Number
  /*
  design
  busyness/crowds

  */
});

module.exports = mongoose.model('Fountain', FountainSchema);
