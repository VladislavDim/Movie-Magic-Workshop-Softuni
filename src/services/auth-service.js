import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const SECRET = '!3sd2$@a3%h76^&h67F5656^^5f%&&jGh%^4d6%Ffdfdf#$f$B7B$ggg$%&b&^';

export default {
    register(userData) {
        return User.create(userData);
    },
    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid email or password');
        }

        const payload = {
            id: user.id,
            email: user.email
        }
        
        const token = jwt.sign(payload, SECRET, { expiresIn: '2h' });
        return token;
    }
}