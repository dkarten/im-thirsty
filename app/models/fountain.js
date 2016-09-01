import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var FountainSchema = new Schema({
  park_code: String,
  /* future columns?
  borough: String/Number
  */
  loc: {
    type: String,
    coordinates: [Number]
  },
  working: Boolean,
  ratings:[{type:Schema.Types.ObjectId, ref:'Rating'}],
  comments:[{type:Schema.Types.ObjectId, ref:'Comment'}]
});

module.exports = mongoose.model('Fountain', FountainSchema);
