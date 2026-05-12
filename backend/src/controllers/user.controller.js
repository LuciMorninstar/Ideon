import User from "../models/user.model.js";

export const addAsFriend = async (req, res, next) => {
  const myId = req.user?.id;
  const { id: userToAdd } = req.params;

  try {
    if (!myId) {
      const err = new Error("UnAuthorized Access");
      err.statusCode = 401;
      return next(err);
    }

    if (!userToAdd) {
      const err = new Error("No friends to add");
      err.statusCode = 400;
      return next(err);
    }

    if (myId.toString() === userToAdd.toString()) {
      const err = new Error("You cannot add yourself");
      err.statusCode = 400;
      return next(err);
    }
    // adding to friends array as a user
    await User.findByIdAndUpdate(
      myId,
      {
        $addToSet: { friends: userToAdd },
      },
      { new: true },
    );

    // when friend is added both side friend is increased so
    //Also need to add mine id to the friend's friends array

    await User.findByIdAndUpdate(
      userToAdd,
      {
        $addToSet: { friends: myId }, // added myId to his friends array
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Successfully added as a friend",
      friendId: userToAdd,
    });
  } catch (error) {
    console.log(`Error in the addAsFriend Controller : ${error.message}`);
    next(error);
  }
};

export const unfriend = async (req, res, next) => {
  const myId = req.user?.id;
  const { id: userToUnfriend } = req.params;

  try {
    if (!myId) {
      const err = new Error("Unauthorized Access");
      err.statusCode = 401;
      return next(err);
    }

    if (!userToUnfriend) {
      const err = new Error("No user to unfriend");
      err.statusCode = 400;
      return next(err);
    }

    // update from my side
    await User.findByIdAndUpdate(
      myId,
      {
        $pull: { friends: userToUnfriend },
      },
      { new: true },
    );
    //update from the friend side
    await User.findByIdAndUpdate(
      userToUnfriend,
      {
        $pull: { friends: myId },
      },
      { new: true },
    );

    return res.status(200).json({
      sucess: true,
      message: "Sucessfully removed from friend list",
    });
  } catch (error) {
    console.log(`Error in the unfriend controller : ${error.message}`);
    next(error);
  }
};

export const getAllMyFriends = async (req, res, next) => {
  const myId = req.user?.id;

  try {
    if (!myId) {
      const err = new Error("UnAuthorized Access!");
      err.statusCode = 401;
      return next(err);
    }

    const user = await User.findById(myId)
      .select("friends")
      .populate("friends", "name profilePic email ");

    if (!user) {
      const err = new Error("No user found!");
      err.statusCode = 400;
      return next(err);
    }

    const allMyFriends = user.friends;

    if (!allMyFriends.length) {
      return res.status(200).json({
        success: true,
        message: "No friends in contact",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched the friends",
      friends: allMyFriends,
    });
  } catch (error) {
    console.log(`Error in the getAllMyFriends controller : ${error.message}`);
    next(error);
  }
};

export const searchUsers = async (req, res, next) => {
  const search = req.query.q?.trim();  //?q=bibek when sending from frontend

  try {
    if (!search) {
      const err = new Error("Search query is missing");
      err.statusCode = 400;
      return next(err);
    }

    const users = await User.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
         //                 $options: "i"
        // Makes the search case-insensitive
        // regex Allows partial matching, not exact match
    });

    if(!users || users.length === 0){
        const err = new Error("No users found!");
        err.statusCode = 404;
        return next(err);
    }

    return res.status(200).json({
        success:true,
        message:"Successfully fetched the users",
        users

    })
  } catch (error) {
    console.log(`Error in the searchUsers Controller :${error.message}`);
    next(error)
  }
};

export const searchFromFriend = async(req,res,next)=>{
    
    const search = req.query.friend?.trim();
    const myId = req.user?._id;
    

    try {

        if(!myId){
            const err = new Error("UnAuthorized Access!");
            err.statusCode = 401;
            return next(err);
        }
        
        if(!search){
            const err = new Error("friend query is missing!");
            err.statusCode = 400;
            return next(err);
        }s

        const me = await User.findById(myId).select("friends");


        const friends = await User.find({
            _id:{ $in:me.friends},
            $or:[
                {name:{$regex:search, $options:"i"}},
                {email:{$regex:search, $options:"i"}}
            ]
        }).select("name email profilePic") 
        // (select) =only return name email profilePic

        if(!friends || friends.length === 0 ){
            return res.status(200).json({
                success:true,
                message:"No friends found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Successfully fetched Friends from search",
            friends
        })
       
 
    } catch (error) {
        console.log(`Error in the searchFromFriend Controller: ${error.message}`);
        next(error);

        
    }
}

export const getAllUsers = async(req,res,next)=>{

  try {
    const users = await User.find().select("name email profilePic");

    if(!users){
      const err = new Error("No users found!");
      err.statusCode = 404;
      return next(err);
    }

    return res.status(200).json({
      success:true,
      message:"Successfully fetched all users",
      users
    })
    

    
  } catch (error) {
    console.log(`Error in the getAllUsers Controller: ${error.message}`);
    next(error);
    
  }
}




