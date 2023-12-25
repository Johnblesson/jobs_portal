import express from 'express';
const router = express.Router();
import { 
  login, 
  getUsers 
} from '../controllers/usersController.js'; // Importing register and login functions from usersController.js

router.post('/login', login); // Route for logging in
router.get('/getUsers', getUsers); // Route for getting all users

export default router;