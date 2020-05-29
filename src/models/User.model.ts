import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    profileName: {type: String, required: true},
    email: {type: String, unique: true},
    passWord: {type: String},
    gender: {type: String},
    dateOfBirth: {type: String},
    active: {type: Boolean, required: true},
    avatar: {type: String},
    status: {type: String},
    socialKey: {type: String},
    createTime: {type: Date, default: Date.now},
    updateTime: {type: Date, default: Date.now}
});
export const userModel = mongoose.model('user_infos',userSchema);