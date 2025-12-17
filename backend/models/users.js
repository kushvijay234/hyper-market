import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: { type: String },
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
    googleId: { type: String },
    profileImage: { type: String },
    createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model('User', userSchema);

export default User;