import mongoose from 'mongoose';

export async function dbConnect() {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/dogmate', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    return conn;
  } catch (e) {
    console.error('Connection error:', e.message);
    throw new Error(e.message);
  }
}
