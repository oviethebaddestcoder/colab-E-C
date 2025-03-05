import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

profilePicture: { type: String, default: '' },
role: { type: String, enum: ['user', 'admin'], default: 'user' },
listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork'
}],
purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork'
}]
});

const User = mongoose.models('User', UserSchema);

export default User;