import Post from "../models/post.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

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

export const updatePost = async(req,res,next)=>{
    const {id:postId} = req.params;
    const {text} = req.body;
    const userId =req.user._id;

    try {
        const post = await Post.findById(postId);
        if(!post){
            const err = new Error("Post not found!");
            err.statusCode = 404;
            return next(err);
        }
        const isOwnerOfPost = post.owner.toString() === userId.toString();
        
        if(!isOwnerOfPost){
            const err = new Error("You are not authorized to update the post");
            err.statusCode = 401;
            return next(err);
        }

        let imageUrls = [];

        if(req.files?.images?.length>0){
            const uploadImages = await uploadOnCloudinary(req.files?.images?.map((img)=>img.path))

            imageUrls = uploadImages.map((img)=>({
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

        const updatedPost = await Post.findByIdAndUpdate(postId,{
            text:text ? text :post.text,
            date:Date.now(),
            isEdited:true,
            images:imageUrls.length >0 ? imageUrls:post.images,
            video:videoUrl ? videoUrl : post.video
        },
        {new:true}
    );

    return res.status(200).json({
        success:true,
        message:"Updated post successfully",
        post:updatedPost
    })


        
    } catch (error) {
        console.log(`Error in the updatePost controller ${error.message}`);
        next(error);
        
    }

}

export const deletePost = async(req,res,next)=>{
    const myId = req.user?.id;
    const {id:postId} = req.params;

    try {

        if(!myId){
        const err = new Error("Unauthorized Access");
        err.statusCode = 401;
        return next(err);
}
      
        const post = await Post.findById({_id:postId});
        if(!post){
            const err = new Error("No post to delete");
            err.statusCode = 400;
            return next(err);
        }

        if(post.owner.toString() !== myId.toString()){
            const err = new Error("UnAuthorized! You are not the owner of the post");
            err.statusCode = 403;
            return next(err);

        }

        if(post.images?.length >0){
           for(const img of post.images){
            await deleteFromCloudinary(img.public_id);
           }
        }

        if(post.video){
            await deleteFromCloudinary(post.video.public_id);
        }

        await Post.findByIdAndDelete(postId);

        return res.status(200).json({
            success:true,
            message:"Successfully deleted the post"
        });

     

        
    } catch (error) {
        console.log(`Error deleting the post: ${error.message}`);
        next(error);
        
    }


}