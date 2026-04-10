import express from "express"
import "dotenv/config";
import { connectDB } from "./utils/connectDB.js";
import authRoutes from "./routes/auth.route.js"
import postRoutes from "./routes/post.route.js"
import userRoutes from "./routes/user.route.js"
import messageRoutes from "./routes/message.route.js"
import { errorMiddleware } from "./middlewares/errror.middleware.js";
import cookieParser from "cookie-parser"


const app = express();
const PORT = process.env.PORT || 5000;




app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/post",postRoutes);
app.use("/api/user",userRoutes);
app.use("/api/message",messageRoutes);


app.use(errorMiddleware);

app.listen(PORT, async()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectDB();

})

