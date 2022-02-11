import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
export const connectDB = () => {
  try {
    mongoose.connect(process.env.DATABASE_URL as string, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
      console.log('Connected to DB sucessfully!');
    });
  } catch (error) {
    console.log(error);
  }
};
export const connectTestDB = () => {
  try {
    MongoMemoryServer.create().then((mongo) => {
      const uri = mongo.getUri();
      mongoose.connect(uri).then(() => {
        console.log('connected to testDB');
      });
    });
  } catch (error) {
    console.log(error);
  }
};
