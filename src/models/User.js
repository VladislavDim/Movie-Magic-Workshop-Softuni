import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        match: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
        minLength: 10
    },
    password: {
        type: String,
        match: /^[A-Za-z0-9]+$/,
        minLength: [6, 'Password must be at least 6 characters long.'],
        trim: true
    }
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;