import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  episode_id: {type: Number,unique: true,required: true},
  movie_url: {type: String}
});
export const movieModel = mongoose.model('movies',movieSchema);