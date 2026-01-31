import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
    {
        email: String,
        name: String,
        image: String,
        role: String,
    },
    { timestamps: true }
);

export default models.User || model('User', UserSchema, 'users');
