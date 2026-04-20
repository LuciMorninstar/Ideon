import mongoose from "mongoose";

const savedPostsSchema = new mongoose.Schema( {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    post: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required:true
      }
    
  },
  { timestamps: true },
);

//so instead of putting posts in array created single document for each saved so as not to hit the limit of 16mb also good for scaling

savedPostsSchema.index({user:1,post:1},{unique:true});
//tells MongoDB to create an index
// enforces uniqueness
// speeds up queries
const savedPosts = mongoose.model("savedPosts",savedPostsSchema);
export default savedPosts;