import {v2 as cloudinary} from "cloudinary"
import "dotenv/config"
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(Array.isArray(localFilePath)){
            const results = await Promise.all(localFilePath.map((path)=>cloudinary.uploader.upload(path,{
                folder:"Ideon files",
                resource_type:"auto"
            })))
   

        localFilePath.forEach((path)=>{
            try {
                fs.unlinkSync(path);
                
            } catch (error) {
                console.log(error);
                
            }
        })
        return results;
             }//close it here

             if(!localFilePath){
                return null;
             }

             //if single filepath (not array)
             const response = await cloudinary.uploader.upload(localFilePath,{
                folder:"Ideon",
                resource_type:"auto"
             })

             console.log("Successfully uploaded to the cloudinary",response?.original_filename);

             fs.unlinkSync(localFilePath);

             return response;
        
    } catch (error) {
        if(Array.isArray(localFilePath)){
            localFilePath.forEach((path)=>{
                try {
                    fs.unlinkSync(path);
                    
                } catch (error) {
                    console.log(error);
                    
                }
            })
        }
        else if(localFilePath){
            try {
                fs.unlinkSync(localFilePath);
                
            } catch (error) {
                console.log(error);
                
            }
        }
        return null;
        
    }
}

export const deleteFromCloudinary = async(public_id)=>{
    try {
        if(!public_id){
            return null;
        }

        const response = await cloudinary.uploader.destroy(public_id);
        console.log(`Successfully deleted the file with public id ${public_id} from cloudinary`);

        return response;
        
    } catch (error) {
        console.log(`Error deleting the file of ${public_id} public id from cloudinary`);
        return null;
        
    }
}