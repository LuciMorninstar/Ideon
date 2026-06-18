import savedPosts from "../models/savedPosts.model.js";

function checkMyId(myId){
    if(!myId){
        const err = new Error("UnAuthorized Access!");
        err.statusCode = 401;
        throw err; // since the next is not defined here
    }
}



export const addToSavedPosts = async(req,res,next)=>{
    const {id:postId} = req.params;
    const myId = req.user?._id;

    try {
        if(!myId){
            const err = new Error("UnAuthorized Access!");
            err.statusCode = 401;
            return next(err);
        }
        if(!postId){
            const err = new Error("Post id is required!");
            err.statusCode = 400;
            return next(err);
        }

    const savedPost = await savedPosts.create({
        user:myId,
        post:postId
        })

        return res.status(201).json({
            succcess:true,
            message:"Successfully saved the post",
            savedPost
        })
        
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({
                message:"Post already saved"
            })
        }// here this is catching the duplicate key error since in post model we uses the index to prevent duplicates.. and because of index ( we also doin't need to check if post already exists since it already creates uniqueness in mongodb )
        console.log(`Error in the addToSavedPosts controller :${error.message}`);
        next(error);
        
    }
}

export const getAllMySavedPosts = async(req,res,next)=>{
    const myId = req.user?._id;
    

  

    try {
       checkMyId(myId);

        const mySavedPosts = await savedPosts.find({user:myId}).populate({
            path:"post",
            select:"text images video reactions comments owner type category createdAt",
            populate:[
                {path:"owner", select:"name profilePic"}
            ]
        });

        if(!mySavedPosts || mySavedPosts.length === 0){
            return res.status(200).json({
                success:true,
                message:"No saved Posts Found!",
                mySavedPosts:[]
            })
            
        }

        return res.status(200).json({
            success:true,
            message:"Successfully getAllMySavedPosts",
            mySavedPosts
        })

        
    } catch (error) {
        console.log(`Error in the getAllMySavedPosts controller : ${error.message}`);
        next(error);
        
    }
    
}

export const deleteSingleSavedPost = async(req,res,next)=>{
    const myId = req.user?._id;
    const {id:postId} = req.params;

    try {
        checkMyId(myId);

        const deleteSavedPost = await savedPosts.findOneAndDelete({user:myId, post:postId});

        if(!deleteSavedPost){
            const err = new Error("No post with that id to delete");
            err.statusCode = 400;
            return next(err);
        }

        return res.status(200).json({
            success:true,
            message:"Saved post deleted",
            post:deleteSavedPost
        })

        
    } catch (error) {
        console.log(`Error in the deleteSingleSavedPost controller :${error.message}`);
        next(error);
        
    }
}


export const deleteAllMySavedPosts = async(req,res,next)=>{
    const myId = req.user?._id;

    try {
        checkMyId(myId);

        const deleteAllSavedPosts = await savedPosts.deleteMany({user:myId});

        if(deleteAllSavedPosts.deleteCount === 0){
            const err = new Error("No saved Posts found!");
            err.statusCode = 400;
            return next(err);
        }

        return res.status(200).json({
            success:true,
            message:"Deleted All saved Posts",
        })


    } catch (error) {
        console.log(`Error in the deleteAllMySavedPosts : ${error.message}`);
        next(error);
        
    }
    
}
