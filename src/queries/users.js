import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: String, required: true },
  nickname: { type: String },
  photoUrl: { type: String },
  email: { type: String },
  sex: { type: String, required: true },
  description: { type: String },
  role: { type: String, required: true },
  isVerified: { type: Boolean, required: true },
  contactInfo: { type: String },
  rating: { type: Number },
});

export const User = mongoose.models.User ?? mongoose.model('User', UserSchema);

export async function createUser(user) {
  try {
    console.log('Creating user:', user);
    const createdUser = await User.create(user);
    console.log('Created user:', createdUser);
  } catch (e) {
    console.error('Error during user creation:', e.message);
    throw new Error(e);
  }
}
