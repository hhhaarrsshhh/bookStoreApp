import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRoute from './routes/book_route.js';
import cors from 'cors';
import userRoute from './routes/user_routes.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const Url = process.env.MongoDbUrl;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Connect to database
async function connectDB() {
  try {
    await mongoose.connect(Url); // No deprecated options needed
    console.log('Connected to database');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1); // Exit if DB connection fails
  }
}

connectDB();

// Define routes
app.use('/book', bookRoute);
app.use('/user', userRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
