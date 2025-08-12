import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
  const dbName = process.env.MONGODB_DB || 'mindsketch';

  mongoose.connection.on('connected', () => {
    console.log('Database Connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  await mongoose.connect(mongoUri, { dbName });
};

export default connectDB;




// import mongoose from 'mongoose';

// const connectDB = async () => {
//     mongoose.connection.on("connected", () => {
//     console.log('Database Connected')})

// await mongoose.connect(`${process.env.MONGODB_URI}/mindsketch` )
//     }

//     export default connectDB;