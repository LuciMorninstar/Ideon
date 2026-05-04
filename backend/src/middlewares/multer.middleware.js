import multer from "multer"

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "public/uploads");
    },

    filename: function (req,file,cb){
        const uniqueFileName = Date.now() + "-"+Math.round(Math.random() * 10);
        cb(null, file.fieldname +"-"  + uniqueFileName);
    }
})

const upload = multer({storage:storage});

export default upload;