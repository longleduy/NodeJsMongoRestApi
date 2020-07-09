import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  tag_id: {type: Number,unique: true,required: true},
  tag_title: {type: String}
});
export const tagModel = mongoose.model('tags',tagSchema);