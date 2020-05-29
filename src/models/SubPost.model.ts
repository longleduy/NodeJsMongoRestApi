import mongoose from 'mongoose';

const subPostSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    title: {type: String},
    content: {type: String},
    isLock: {type: Number},
    postDate: {type: String}
});
export const subPostModel = mongoose.model('sub_posts',subPostSchema);