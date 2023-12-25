import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import dotenv from "dotenv";
dotenv.config();

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 100),
      impressions: Math.floor(Math.random() * 100),
    });

    // create payload
    const payload = {
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    };

    // create token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

    const savedUser = await newUser.save();
    res.status(201).json({ token, savedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1200s' });
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // Define login Function
// export const login = async (req, res) => {
//     const { email, password } = req.body;
  
//   // Console Log for Debugging:
//     console.log('Login BACKEND', email, password);
  
//   // Check if user exists in database
//     try {
//       const user = await User.findOne({ email: email });
  
//   // Handle User Not Found
//     if (!user) {
//         res.status(404).json({ error: 'User not found' });
//         return;
//       }
//       console.log('data:', user);
  
//   // Handle Invalid User Data
//     const userPass = user?.password;
//       if (!userPass) {
//         return res.status(500).json({ error: 'Invalid user data in the database' });
//       }
  
//   // Create JWT Payload:
//       const payload = {
//         user: {
//             id: newUser._id,
//             firstName: newUser.firstName,
//             email,
//         },
//       };
  
// // Sign JWT Token
//       const token = await jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
//         expiresIn: '10d',
//       });
// // Send JWT Token and User Data in Response
//       console.log('Payload:', payload);
//       console.log('Token:', token);
//       return res.json({ accessToken: token, user });   
//   }
  
// // Handle Errors      
//     catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Server Error' });
//     return;
//     }
//   };
  

/* GET ALL USERS */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
