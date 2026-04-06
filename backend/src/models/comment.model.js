import mongoose from "mongoose"


const commentSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    text:{
        type:String,
  
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    image: 
         {
            url:{type:String, default:null},
            public_id:{type:String, default:null}

        },
        
        //Rather than use of like and disliked instead use the reactions way to avoid conflicts of like and dislike
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
    replies:[
        {
            owner:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            text:{
                type:String,
              
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
            ]
         
        }
      
    ]


    

},{timestamps:true})

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;


// also add the post id to ref because comment is of a post