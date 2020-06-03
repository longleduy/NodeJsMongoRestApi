import mongoose from 'mongoose';

const episodeSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    title: {type: String},
    content: {type: String},
    isLock: {type: Number},
    postDate: {type: String}
});
export const episodeModel = mongoose.model('episodes',episodeSchema);