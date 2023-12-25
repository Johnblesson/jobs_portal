// models/Post.js
import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    jobTitle: { type: String, required: true },
    jobLocation: { type: String, required: true },
    jobType: { type: String, required: true },
    industry: String,
    jobDescription: { type: String, required: true },
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Jobs', postSchema);
export default Post;
