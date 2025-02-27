import mongoose from "mongoose";
const { MONGODB_URI } = process.env;

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      "mongodb://localhost:27017/one-page-db"
    );
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
