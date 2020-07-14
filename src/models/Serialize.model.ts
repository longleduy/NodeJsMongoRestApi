import mongoose from 'mongoose';

const serializeSchema = new mongoose.Schema({
  serialize_id: {type: Number,unique: true,required: true},
  serialize_title: {type: String},
  corner_id: {type: String},
});
export const serializeModel = mongoose.model('serializes',serializeSchema);