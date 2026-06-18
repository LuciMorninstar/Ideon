import Story from "../models/story.model.js";
import User from "../models/user.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";






export const showFriendStories = async(req,res,next)=>{

    const myId = req.user?._id;

    try {

          if(!myId){
        const err = new Error("UnAuthorized Access!");
        err.statusCode = 401;
        return next(err);
    }

    const me = await User.findById(myId);

    if(!me){
        const err = new Error("No user found with that id");
        err.statusCode = 404;
        return next(err);
    }

    const myFriends = me.friends;

    if(myFriends.length === 0 ){
        return res.status(200).json({
            success:true,
            message:"No stories to show",
            stories:[]
        })
    }

    const staleTime = new Date(Date.now() - 7 * 24 * 60 * 60* 1000);
    // stories only shown less than 3 days stale time

    const stories = await Story.find({
        owner:{$in:me.friends}, //find the story if myfriends are in owner of Story mdoel
        createdAt:{$gte:staleTime}
        
    }).populate("owner", "username profilePic")  // to show which user send it

    return res.status(200).json({
        success:true,
        message:"Stories found",
        stories:stories
    })
        
    } catch (error) {
        console.log(`Error in the showSpecificStories controller : ${error.message}`);
        next(error);
    }
} 

export const showAllStories = async(req,res,next)=>{
    
    const myId = req.user?._id;

    try {

        if(!myId){
            const err = new Error("UnAuthorized Access!");
            err.statusCode = 401;
            return next(err);
        }

        const stories = await Story.find().populate("owner", "profilePic name coverImage")

        if(!stories || stories.length === 0 ){
            const err = new Error("No stories found");
            err.statusCode = 404;
            return next(err);
        }

        return res.status(200).json({
            success:true,
            message:"Stories fetched successfully",
            stories
        })
        
    } catch (error) {
        console.log(`Error in the showAllStories Controller : ${error.message}`);
        next(error);
    }
    
}
export const createStory = async(req,res,next)=>{

    const myId = req.user?._id;
    const {title, visibility} = req.body;

    try {

        if(!title){
            const err = new Error("Title is required");
            err.statusCode = 400;
            return next(err);

        }

        if(!myId){
            const err = new Error("UnAuthorized Access!");
            err.statusCode = 401;
            return next(err);
        }

        let videoUrl = null;

        if(req.files?.video?.[0]){
            const uploadVideo = await uploadOnCloudinary(req.files?.video[0].path);

            videoUrl = {
                url:uploadVideo.url,
                public_id:uploadVideo.public_id
            }    
        }
        let imageUrl = null;

        if(req.files?.image?.[0]){
            const uploadImage = await uploadOnCloudinary(req.files?.image[0].path);

            imageUrl = {
                url:uploadImage.url,
                public_id:uploadImage.public_id
            }

        }

        // if(!videoUrl || !imageUrl){
        //     const err = new Error("Cannot create an empty story");
        //     err.statusCode= 400;
        //     return next(err);
        // }

        const story = await Story.create({
            owner:myId,
            title:title ? title : "No title",
            video:videoUrl,
            image:imageUrl,
            visibility:visibility
        })

        return res.status(201).json({
            success:true,
            message:"Successfully create a story",
            story
        })


        
    } catch (error) {
        console.log(`Error in the createStory Controller : ${error.message}`);
        
    }
}

export const deleteStory = async(req,res,next)=>{
    const myId = req.user?._id;
    const storyId = req.params.id;

    // console.log("Story Id", storyId);

    try {
        if(!myId){
            const err = new Error("UnAuthorized Access!");
            err.statusCode = 401;
            return next(err);
        }
        
        const story = await Story.findById(storyId);

        if(!story){
            const err = new Error ("No story found with that id");
            err.statusCode = 404;
            return next(err);
        }

        if(story.owner._id.toString() !== myId.toString()){
            const err = new Error("You are not the owner of this story");
            err.statusCode = 401;
            return next(err);
        }

        if(story.image?.length > 0){
            await deleteFromCloudinary(story.image?.public_id);
        }
        if(story.video?.length > 0){
            await deleteFromCloudinary(story.video?.public_id);
        }

        await Story.findByIdAndDelete(storyId);

        return res.status(200).json({
            success:true,
            message:"Successfully deleted the story "
        })
        
    } catch (error) {
        console.log(`Error in the deleteStory controller : ${error.message}`);
        
    }
}


export const updateStory = async(req,res,next)=>{
    const myId = req.user?._id;
    const {title} = req.body;
    const storyId = req.params.id;

    try {
        if(!myId){
            const err = new Error("UnAuthorized Access!");
            err.statusCode = 401;
            return next(err);
        }

        const story = await Story.findById(storyId);

        if(!story){
            const err = new Error("No story found with provided id");
            err.statusCode = 404;
            return next(err);
        }

            if(!title && !req.files?.image?.[0] && !req.files?.image?.[0]){
                const err = new Error("Any one of the field is required in order to update");
                err.statusCode = 400;
                return next(err);
            }

        const ownerOfTheStory = story.owner.toString()=== myId.toString();

        if(!ownerOfTheStory){
            const err = new Error("You are not the owner of the story");
            err.statusCode = 401;
            return next(err);
        }

        if(story.image?.length > 0){
            await deleteFromCloudinary(story.image?.public_id);
        }
        if(story.video?.length > 0){
            await deleteFromCloudinary(story.video?.public_id);
        }

        let imageUrl = null;
        if(req.files?.image?.[0]){
            const uploadImage = await uploadOnCloudinary(req.files?.image[0].path);

            imageUrl = {
                url:uploadImage.url,
                public_id:uploadImage.public_id
            }   
        }  

        let videoUrl = null;

        if(req.files?.video?.[0]){
            const uploadVideo = await uploadOnCloudinary(req.files?.video?.[0].path);

            videoUrl = {
                url:uploadVideo.url,
                public_id:uploadVideo.public_id
            }

        }

        return res.status(200).json({
            success:true,
            message:"Successfully updated the story",
            updatedStory:story

        })

        
        
    } catch (error) {
        console.log(`Error in the updateStory Controller : ${error.message}`);
        next(error);
        
    }

}

export const getStoryById = async(req,res,next)=>{
     const myId = req.user?._id;
     const {id:storyId} = req.params;

     try {
        if(!myId){
            const err = new Error("UnAuthorized Access!");
            err.statusCode = 401;
            return next(err);
        }

        const story = await Story.findById(storyId).populate("owner", "profilePic coverImage name");

        if(!story){
            const err = new Error("No story found with that id");
            err.statusCode = 404;
            return next(err);
        }

        return res.status(200).json({
            success:true,
            story
        })

        
     } catch (error) {
        console.log(`Error in the getStoryById controller : ${error.message}`);
        next(error);
        
     }

}



