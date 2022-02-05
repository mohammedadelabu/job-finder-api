// import mongoose from "mongoose";
// import { MongoMemoryServer } from "mongodb-memory-server";
// require('dotenv').config();

// export const connectDB = () => {
//   try {
//     mongoose.connect(`${process.env.DATABASE_URL}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const connectTestDB = () => {
//   try{
//     MongoMemoryServer.create().then((mongo) => {
//       const uri:any = mongo.getUri();
//       mongoose.connect(uri).then(() => {
//         // console.log("connected to testDB");
//       });
//     });
//   }
//   catch (error:any) {
//     console.log(error);
//   }
// };


import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
export const connectDB = () => {
  try {
    mongoose.connect(process.env.DATABASE_URL as string, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
      console.log('Connected to DB');
    });
  } catch (error) {
    //console.log(error);
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
    //console.log(error);
  }
};
