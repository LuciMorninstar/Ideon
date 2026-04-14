

const storySchema = new mongoose.Schema({

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    title:{
        type:String,
    },
    video:{
        url:{type:String, default:null},
        public_id:{type:String, default:null}
    },
    image:{
        url:{type:String, default:null},
        public_id:{type:String, default:null}
    },
    clickCount:{
        type:Number,
        default:0
    },
    visibility:{
        type:String,
        enum:["public","private", "friends"],
        default:"public"
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

},{timestamps:true})