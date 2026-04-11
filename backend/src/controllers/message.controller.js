
import Message from "../models/message.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

export const sendMessage = async(req,res,next)=>{
    const myId = req.user?.id;
    const {receiverId} = req.params;
    const {text} = req.body;

    try {

        if(!myId){
            const err = new Error("UnAuthorized Access!");
            err.statusCode = 401;
            return next(err);
        }
        if(!receiverId){
            const err = new Error("No receiverId provided to send message");
            err.statusCode = 400;
            return next(err);
        }
        


        let imageUrls = [];

        if(req.files?.images?.length>0){
            const uploadedImages = await uploadOnCloudinary(req.files.images?.map((img)=>img.path));

            imageUrls = uploadedImages.map((img)=>({
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

        const message = await Message.create({

            senderId: myId,
            receiverId:receiverId,
            text: text || null,
            images: imageUrls ,
            video: videoUrl
           
        })

        return res.status(201).json({
            success:true,
            message:"Message send successfully",
            message
        })
        
    } catch (error) {
        console.log(`Error in the message controller : ${error.message}`);
        next(error);
        
    }

}



//To get all the Messages of mine (not of an individual chat)
export const getMyMessages = async(req,res,next)=>{

    const myId = req.user?.id;

    try {
        if(!myId){
            const err = new Error("UnAuthorized Access");
            err.statusCode = 401;
            return next(err);
        }

        const myMessages = await Message.find(
            {
                $or:[
                    {senderId:myId},
                    {receiverId:myId}
                ]
            }
        ).sort({createdAt:1})

        if(myMessages.length === 0){
            return res.status(200).json({
                success:true,
                message:"No messages found",
                myMessages:[]
            })
        }

        return res.status(200).json({
            success:true,
            message:"Successfully found myMessages",
            myMessages:myMessages

        })

    
    } catch (error) {
        console.log(`Error in the getMyMessages Controller : ${error.message}`);
        next(error);
        
    }


}

//To get chats related to individual

export const getConversationMessages = async(req,res,next)=>{

    const myId = req.user?.id;
    const {friendId} = req.params;

    try {

        if(!myId){
            const err = new Error("UnAuthorized Access");
            err.statusCode = 401;
            return next(err);
        }

        if(!friendId){
            const err = new Error("No friendId provided");
            err.statusCode = 404;
            return next(err);
        }

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:friendId},
                {senderId:friendId, receiverId:myId}
            ]
        }).sort({createdAt:1})

        if(messages.length === 0 ){
            return res.status(200).json({
                success:true,
                message: "No messages found!",
                messages:[]
            })
        }

        return res.status(200).json({
            success:true,
            message:"Messages found Successfully",
            messages:messages
        })
        

    } catch (error) {
        console.log( `Error in the getConversationMessages Controller : ${error.message}`);
        next(error);
        
    }


}

