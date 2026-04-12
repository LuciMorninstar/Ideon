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
    //store the reference of message than the whole data.
    replyTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        default:null
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

    isEditedAt:{
        type:Date,
        default:Date.now
    },
    
  seenBy: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
]

    

},{timestamps:true})

const Message = mongoose.model("Message", messageSchema);
export default Message;