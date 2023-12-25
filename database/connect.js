import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to Database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectDB;