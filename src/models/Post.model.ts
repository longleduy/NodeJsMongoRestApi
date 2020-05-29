import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    title: {type: String},
    content: {type: String},
    isLock: {type: Number},
    postDate: {type: String}
});
export const postModel = mongoose.model('posts',postSchema);