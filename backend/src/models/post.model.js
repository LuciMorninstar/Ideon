import mongoose from "mongoose";


const postSchema = new mongoose.Schema({

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    date:{
        type:Date,
        default:Date.now
    },

    //updated by system not user
    type:{
        type:String,
        enum:["text","image","video","link","reels","story"]
    },

    category: {
    type: String,
    enum: [ "tech","education","entertainment","sports","gaming",
        "business","finance","lifestyle","health","fitness",
        "travel","food","fashion","news","politics",
        "science","motivation","art","music","movies",
        "photography","memes","relationships","self-development","other"
    ],
    default: "other"
    },

    tags:[
        {
            type:String,
            lowercase:true,
            trim:true

        }
    ],

    clickCount:{
        type:Number,
        default:0
    },

    visibility:{
        type:String,
        enum:["public","private","friends"],
        default:"public"
    },

    taggedFriends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],


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