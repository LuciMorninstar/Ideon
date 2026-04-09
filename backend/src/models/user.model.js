import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is required"],
    
    },
    
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true,
        trim:true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
    },

    password:{
        type:String,
        minLength:[6, "Password must be at least 6 characters long"],
        required:[true, "Password is required"],  
     
    },


    role:{
        type:String,
        enum:["user", "admin"],
        default:"user"
    },

    profilePic:{
        url:{type:String, default:null},
        public_id:{type:String, default:null}
    },
    
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ],

    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    groups:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Group"
        }
    ]


},{timestamps:true})

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return ;

   try {
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password,salt);
     
 
   } catch (error) {
        console.log(`Error hashing the password`, error.message);
        next(error);
    
   }
})

userSchema.methods.comparePassword = async function(TypedPassword){
    return bcrypt.compare(TypedPassword, this.password);
}


const User = mongoose.model("User", userSchema);
export default User;

