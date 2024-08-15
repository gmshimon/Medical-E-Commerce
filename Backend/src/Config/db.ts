import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    // const conn = await mongoose.connect("mongodb://localhost:27017/MEDHomeDB");
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
