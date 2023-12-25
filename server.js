import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Importing external files
import connectDB from './database/connect.js';
import userRoute from './routes/usersRoute.js'; // Importing userRoute
import jobRoute from './routes/jobsRoutes.js'; // Importing jobRoute    
import { verifyToken } from "./middleware/auth.js";
import { register } from './controllers/usersController.js'; // Importing register and login functions from usersController.js
import { upload } from './upload/upload.js';
import { createJob } from "./controllers/jobsController.js";

// Initializing express
const app = express();

// Configuring express
dotenv.config();
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

// Index Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
  });

// Register Route
app.post('/v1/api/auth/register', upload.single('picturePath'), register); // Route for registering a user

app.post("/v1/api/users/createjob", upload.single("picture"), createJob);

// Routes
app.use('/v1/api/users', userRoute); // Using userRoute
app.use('/v1/api/jobs', jobRoute); // Using jobRoute

// Starting Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});