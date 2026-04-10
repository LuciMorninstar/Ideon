import mongoose from "mongoose"

const groupSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"

        }
    ],
    profilePic:{
        url:{type:String, default:null},
        public_id:{type:String, default:null}
        
    },
    admins:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],

    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }
   


},{timestamps:true})

const Group = mongoose.model("Group", groupSchema);

export default Group;