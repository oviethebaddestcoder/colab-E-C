
import mongoose from 'mongoose';

const AuthSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


const Auth = mongoose.models('Auth', AuthSchema);

export default Auth;