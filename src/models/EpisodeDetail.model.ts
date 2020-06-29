import mongoose from 'mongoose';

const episodeDetailSchema = new mongoose.Schema({
  episode_id: {type: Number, required: true},
  webpage_url: {type: String},
  prev_episode_id: {type: Number},
  prev_episode_play_type: {type: Number},
  next_episode_id: {type: Number},
  next_episode_play_type: {type: Number},
  header_display_type: {type: Number},
  chapters: {type: Array},
  tag_keyword: {type: Array},
  past_episodes: {type: Array}
});
export const episodeDetailModel = mongoose.model('episode_details',episodeDetailSchema);