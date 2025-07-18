import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  bio: String,
  avatar: String
});

export default mongoose.model('User', userSchema);
