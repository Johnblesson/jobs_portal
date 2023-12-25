import Post from "../models/postJobs.js";
import User from "../models/users.js";

/* CREATE JOB */
export const createJob = async (req, res) => {
  try {
    const { userId, jobDescription, picturePath, jobLocation, jobTitle, jobType, industry } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      jobTitle,
      jobLocation,
      jobType,
      industry,
      jobDescription,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* GET ALL JOBS */
export const getJobs = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
