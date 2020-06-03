import mongoose from 'mongoose';

const topVideoSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    title: {type: String},
    content: {type: String},
    isLock: {type: Number},
    postDate: {type: String}
});
export const topVideoModel = mongoose.model('posts',topVideoSchema);