import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Saraha_App");
    console.log("✅ Database connected successfully");
  } 
  catch (err) 
  {
    console.error("❌ Database connection error:", err.message);
  }
}
