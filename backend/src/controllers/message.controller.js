import Message from "../models/message.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";


//Works for sending messages as well as replies
export const sendMessage = async (req, res, next) => {
  const myId = req.user?.id;
  const { receiverId } = req.params;
  const { text } = req.body;
  const {replyTo} = req.body;  //reply to a message

  try {
    if (!myId) {
      const err = new Error("UnAuthorized Access!");
      err.statusCode = 401;
      return next(err);
    }
    if (!receiverId) {
      const err = new Error("No receiverId provided to send message");
      err.statusCode = 400;
      return next(err);
    }

    let imageUrls = [];

    if (req.files?.images?.length > 0) {
      const uploadedImages = await uploadOnCloudinary(
        req.files.images?.map((img) => img.path),
      );

      imageUrls = uploadedImages.map((img) => ({
        url: img.url,
        public_id: img.public_id,
      }));
    }

    let videoUrl = null;

    if (req.files?.video) {
      const uploadVideo = await uploadOnCloudinary(req.files.video.path);

      videoUrl = {
        url: uploadVideo.url,
        public_id: uploadVideo.public_id,
      };
    }

    
    const message = await Message.create({
      senderId: myId,
      receiverId: receiverId,
      text: text || null,
      images: imageUrls,
      video: videoUrl,
      replyTo:replyTo || null,
    });

    return res.status(201).json({
      success: true,
      message: "Message send successfully",
      message,
    });
  } catch (error) {
    console.log(`Error in the message controller : ${error.message}`);
    next(error);
  }
};

//To get all the Messages of mine (not of an individual chat)
export const getMyMessages = async (req, res, next) => {
  const myId = req.user?.id;

  try {
    if (!myId) {
      const err = new Error("UnAuthorized Access");
      err.statusCode = 401;
      return next(err);
    }

    const myMessages = await Message.find({
      $or: [{ senderId: myId }, { receiverId: myId }],
    })
    .populate("senderId", "name email profilePic ")
    .populate("receiverId", "name email profilePic")
    .populate("replyTo", "text senderId images video ")
    .populate("reactions.user", "name profilePic")
    .sort({ createdAt: 1 });

    if (myMessages.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No messages found",
        myMessages: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully found myMessages",
      myMessages: myMessages,
    });
  } catch (error) {
    console.log(`Error in the getMyMessages Controller : ${error.message}`);
    next(error);
  }
};

//To get chats related to individual

export const getConversationMessages = async (req, res, next) => {
  const myId = req.user?.id;
  const { friendId } = req.params;

  try {
    if (!myId) {
      const err = new Error("UnAuthorized Access");
      err.statusCode = 401;
      return next(err);
    }

    if (!friendId) {
      const err = new Error("No friendId provided");
      err.statusCode = 404;
      return next(err);
    }

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: friendId },
        { senderId: friendId, receiverId: myId },
      ],
    })
    .populate("senderId", "name email profilePic ")
    .populate("receiverId", "name email profilePic")
    .populate("replyTo", "text senderId images video ")
    .populate("reactions.user", "name profilePic")
    .sort({ createdAt: 1 });

    if (messages.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No messages found!",
        messages: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Messages found Successfully",
      messages: messages,
    });
  } catch (error) {
    console.log(
      `Error in the getConversationMessages Controller : ${error.message}`,
    );
    next(error);
  }
};

export const editMessage = async (req, res, next) => {
  const myId = req.user?.id;
  const { messageId } = req.params;
  const { text } = req.body;

  try {
    if (!myId) {
      const err = new Error("Unauthorized Access!");
      err.statusCode = 401;
      return next(err);
    }

    const message = await Message.findById(messageId);

    if (!message) {
      const err = new Error("No message found");
      err.statusCode = 404;
      return next(err);
    }

    if (message.senderId.toString() !== myId.toString()) {
      const err = new Error("You cannot edit other's messages");
      err.statusCode = 403;
      return next(err);
    }

    const editTimeLimit = 15 * 60 * 1000;
    const messageAge = Date.now() - message.createdAt.getTime();

    if (messageAge > editTimeLimit) {
      return res.status(400).json({
        success: false,
        message: "You cannot edit this message after 15 minutes",
      });
    }

    let imageUrls = [];

    if (req.files?.images?.length > 0) {
      const uploadImages = await uploadOnCloudinary(
        req.files.images.map((img) => img.path)
      );

      imageUrls = uploadImages.map((img) => ({
        url: img.url,
        public_id: img.public_id,
      }));
    }

    let videoUrl = null;

    if (req.files?.video) {
      const uploadVideo = await uploadOnCloudinary(req.files.video.path);

      videoUrl = {
        url: uploadVideo.url,
        public_id: uploadVideo.public_id,
      };
    }

    if (!text && imageUrls.length === 0 && !videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Nothing to update",
      });
    }

    const update = {
      $set: {
        isEdited: true,
        isEditedAt: new Date(),
      },
    };

    if (text) {
      update.$set.text = text;
    }

    if (videoUrl) {
      update.$set.video = videoUrl;
    }

    if (imageUrls.length > 0) {
      update.$push = {
        images: {
          $each: imageUrls,
        },
      };
    }

    const editedMessage = await Message.findByIdAndUpdate(
      messageId,
      update,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Message edited successfully",
      editedMessage,
    });
  } catch (error) {
    console.log(`Error in editMessage Controller: ${error.message}`);
    next(error);
  }
};


export const addReaction = async(req,res,next)=>{
  const myId = req.user?.id;
  const {messageId} = req.params;
  const {reaction} = req.body;

  try {
    if(!myId){
      const err = new Error("Unauthorized Access!");
      err.statusCode = 401;
      return next(err);
    }

    // const message = await Message.findByIdAndUpdate(messageId,
    //   {
    //     $addToSet:{
    //       reactions:{
    //         user:myId,
    //         reaction:reaction
    //       }
    //     }
    //   },
    //   {new:true}
    // ).populate("reactions.user", "name profilePic");

    const message = await Message.findById(messageId);

    if(!message){
      const err = new Error("No message found!");
      err.statusCode = 404;
      return next(err);
    }

  const existingIndex = message.reactions.findIndex(
  (r) =>
    r.user.toString() === myId.toString() &&
    r.reactionType === reaction
);

    if(existingIndex !== -1){
      message.reactions.splice(existingIndex,1);
    }
    else{
      message.reactions.push({
        user:myId,
        reactionType:reaction
      })
    }

    await message.save();

    await message.populate("reactions.user", "name profilePic");

      return res.status(200).json({
      success: true,
      message: "Reaction toggled successfully",
      data: message,
    });

    
  } catch (error) {
    console.log(`Error in the addReaction Controller : ${error.message}`);
    next(error);
    
  }



}

