import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

let cachedClient: mongoose.Mongoose | null = null;

export async function connectToDatabase() {
  if (cachedClient) {
    console.log("Reusing existing MongoDB connection");

    return cachedClient;
  }
  console.log("Connecting to new MongoDB instance");
  const client = await mongoose.connect(MONGO_URI!);
  cachedClient = client;

  return client;
}
