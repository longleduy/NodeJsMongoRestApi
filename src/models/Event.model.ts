import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  event_id: {type: Number,unique: true,required: true},
  event_title: {type: String},
  corner_id: {type: String},
});
export const eventModel = mongoose.model('events',eventSchema);