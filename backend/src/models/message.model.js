import mongoose from "mongoose"


const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        
    },

    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null

    },
    text:{
        type:String,
    },
    images:[
        {
            url:{type:String, default:null},
            public_id:{type:String, default:null}
            
        }
    ],
    video:{
        url:{type:String, default:null},
        public_id:{type:String, default:null}
        
    },
    reply:{
        text:{
            type:String,
        },
        image:{
            url:{type:String, default:null},
            public_id:{type:String, default:null}
        }
    },
    date:{
        type:Date,
        default:Date.now
    },

    //storing the user along with the reaction to see who react's what reaction type
    reactions:[

        {
           user: {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            reactionType:{
                type:String,
                enum:["like","haha","cry","love","sad"],
            
        }
    }
    ],

    isEdited:{
        type:Boolean,
        default:false
    },
    seenBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }


    

},{timestamps:true})

const Message = mongoose.model("Message", messageSchema);
export default Message;