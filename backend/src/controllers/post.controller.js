import Post from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createPost = async(req,res,next)=>{
    const myId = req.user._id;

    const {text} = req.body;

    try {
        if(!myId){
            const err = new Error("No User Id provided");
            err.statusCode = 401;
            return next(err);
        }
    
        let imagesUrls = [];

        if(req.files?.images?.length >0){
            const uploadImages =  await uploadOnCloudinary(req.files.images.map((img)=>img.path));

            imagesUrls = uploadImages.map(img=>({
                url:img.url,
                public_id:img.public_id
            }))   
        }

        let videoUrl = null;

        if(req.files?.video){
            const uploadVideo = await uploadOnCloudinary(req.files.video.path);
            
            videoUrl = {
                url:uploadVideo.url,
                public_id:uploadVideo.public_id
            }
        }

        if(!text && imagesUrls.length === 0 && !videoUrl){
            const err = new Error("Cannot create an empty post");
            err.statusCode = 400;
            return next(err);
        }

      
        const post = await Post.create({
            owner:myId,
            text:text,
            images:imagesUrls,
            video:videoUrl

        })

        return res.status(201).json({
            success:true,
            message:"Post created successfully",
            post:post
        })

      
        
    } catch (error) {
        console.log(`Error in the createPost controller: ${error.message} `);
        next(error);
        
    }

  

}