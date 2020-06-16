import mongoose from 'mongoose';

const specialSchema = new mongoose.Schema({
  special_id: {type: Number, required: true},
  special_title: {type: String}
});
export const specialModel = mongoose.model('specials',specialSchema);