import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
//import from controller comes here
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
connectDB();


const app = express();
// middleware
app.use(express.json());
// Use routes
app.use(),
app.use(),
app.use(),



console.log('MongoDB URI:', process.env.MONGO_URI); // Check if the URI is defined


// Set up the server to listen on a port
const PORT = process.env.PORT || 4000;

app.listen(PORT, ()  => console.log( `Server running on  http://localhost:${PORT}`));