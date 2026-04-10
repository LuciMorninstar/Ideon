import User from "../models/user.model.js";

export const addAsFriend = async(req,res,next)=>{
    const myId = req.user?.id;
    const {id:userToAdd} = req.params;

    try {
        if(!myId){
            const err = new Error("UnAuthorized Access");
            err.statusCode = 401;
            return next(err);
        }

        if(!userToAdd){
            const err = new Error ("No friends to add");
            err.statusCode = 400;
            return next(err);
        }

        if(myId.toString() === userToAdd.toString()){
            const err = new Error("You cannot add yourself");
            err.statusCode = 400;
            return next(err);

        }
            // adding to friends array as a user
          await User.findByIdAndUpdate(myId,
            {
                $addToSet:{friends:userToAdd},
            },
            {new:true}
         
        );

        // when friend is added both side friend is increased so
        //Also need to add mine id to the friend's friends array

        await User.findByIdAndUpdate(userToAdd,
            {
                $addToSet:{friends:myId} // added myId to his friends array

            }, {new:true}
        );

      

        return res.status(200).json({
            success:true,
            message:"Successfully added as a friend",
            friendId:userToAdd

        })
        

    } catch (error) {
        console.log(`Error in the addAsFriend Controller : ${error.message}`);
        next(error);
        
    }


}

export const unfriend = async(req,res,next)=>{
    const myId = req.user?.id;
    const {id:userToUnfriend} = req.params;

    try {

          if (!myId) {
            const err = new Error("Unauthorized Access");
            err.statusCode = 401;
            return next(err);
        }

        if(!userToUnfriend){
            const err = new Error("No user to unfriend");
            err.statusCode = 400;
            return next(err);
        }

        // update from my side
        await User.findByIdAndUpdate(myId,
            {
                $pull:{friends:userToUnfriend}
            },
            {new:true}

        )
        //update from the friend side
        await User.findByIdAndUpdate(userToUnfriend,
            {
                $pull:{friends:myId}
            },
            {new:true}
        )

        return res.status(200).json({
            sucess:true,
            message:"Sucessfully removed from friend list"
        })

      
    
        
    } catch (error) {
        console.log(`Error in the unfriend controller : ${error.message}`);
        next(error);
        
    }
}


export const getAllMyFriends = async(req,res,next)=>{

    const myId = req.user?.id;

    try {
        if(!myId){
            const err = new Error("UnAuthorized Access!");
            err.statusCode = 401;
            return next(err);
        }

        const user = await User.findById(myId).select("friends").populate("friends", "name profilePic")
        
        if(!user){
            const err = new Error("No user found!");
            err.statusCode = 400;
            return next(err);
        }
       
        const allMyFriends = user.friends;
                      
        if(!allMyFriends.length ){
            return res.status(200).status({
                success:true,
                message:"No friends in contact"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Successfully fetched the friends",
            friends:allMyFriends
        })

        


        
    } catch (error) {
        console.log(`Error in the getAllMyFriends controller : ${error.message}`);
        next(error);
        
    }

}

//todo: do the routes for the user and also add the group controller send messages and all.