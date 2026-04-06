import jwt from "jsonwebtoken"
import "dotenv/config"
import User from "../models/user.model.js"
export const protectRoute = async(req,res,next)=>{

      const accessToken = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

      try {
      
        if(!accessToken){
            const err = new Error("UnAuthorized Access! No access token provided");
            err.statusCode = 401;
            return next(err);
        }
        
       try {

         const decoded = jwt.verify(accessToken,process.env.JWT_ACCESS_TOKEN_SECRET);

         const user = await User.findById(decoded.userId).select("-password");

         if(!user){
            const err = new Error("User not found");
            err.statusCode = 401;
            return next(err);
         }

         req.user = user;
         next();

       } catch (error) {
         if(error.name === "TokenExpiredError"){
            const err = new Error("UnAuthorized Access ! Access Token Expired");
            err.statusCode = 401;
            return next(err);
            
         }
         else{
            throw error;
         }
      
    
       }

        
    } catch (error) {
          console.log("Error in the protectRoute middleware", error.message);
        next(error);
        
    }

}


export const adminRoute = (req,res,next)=>{
    try {
        if(req.user?.role === "admin"){
            return next();
        }

        const err = new Error("UnAuthorized Access! You are not an admin");
        err.statusCode = 401;
        return next(err);
        
    } catch (error) {
        console.log(`Error in the adminRoute middleware ${error.message}`);
        return next(error);
        
    }

}