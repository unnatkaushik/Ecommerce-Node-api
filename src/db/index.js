import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoConnect = await mongoose.connect(`${process.env.DBURL}`);
    console.log(`Mongodb is connected with ${mongoConnect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
