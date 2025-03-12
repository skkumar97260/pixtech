// Import required modules
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './router/index'; // Adjust the path if necessary
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL as string,  )
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error: Error) => {
    console.error("MongoDB Connection Failed:", error);
  });

// Use express.json() for parsing JSON requests
app.use(express.json());

// Use the router
app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Pixalivetech Pvt Ltd.');
})
// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
