import mongoose from "mongoose";


const postSchema = new mongoose.Schema({

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    date:{
        type:Date,
        default:Date.now
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

    reactions:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            type:{
                type:String,
                enum:["like", "dislike"]
            }
        }
    ],

   
    
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    
    shares:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],

    isEdited:{
        type:Boolean,
        default:false
    }



},{timestamps:true})

const Post = mongoose.model("Post", postSchema);

export default Post;