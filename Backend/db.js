import mongoose from "mongoose";

const dbName = "blogsDB";
const baseURI = "mongodb://localhost:27017";

const connectToMongo = async () => {
  try {
    await mongoose.connect(`${baseURI}/${dbName}`);
    console.log("Successfully connected to mongodb");
  } catch (error) {
    console.log(error.message);
  }
}

export default connectToMongo;