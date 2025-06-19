import multer from "multer";
import path from 'path';
import fs from 'fs';
import { error } from "console";






// //לטפל בהעלאה של הקובץ בשמירה שלו ויצירת קישור לקובץ 

// לייצר תיקיית uploads
const uploadsDir = 'uploads/';
if(!fs.existsSync(uploadsDir))
{
    fs.mkdirSync(uploadsDir,{recursive:true});
}

//לקבוע איפה יישמרו 
const storage = multer.diskStorage({
    destination: (req,file,cb) => cb(null,uploadsDir),
    filename: (req,file,cb) => {
        const uniqueFileName = Date.now() + path.extname(file.originalname)
        cb(null,uniqueFileName);
    }
})
// להגדיר פילטר לבדיקה שהקובץ אכן תמונה
const filterFiles = (req,file,cb) =>{
    file.mimetype.startsWith('image/')
    ? cb(null,true) 
    : cb(new Error ('Only image allowed'),false)

}
// ליצור אובייקט של העלאה 
const upload = multer({
    storage,
    filterFiles,
    limits:{fileSize : 10 * 1024 * 1024}
})
//ייצוא פונקציית העלאת התמונה 
export const uploadSingleFile = upload.single('profilePicture')


// עיבוד והכנת הנתונים כולל תשובה אם ישנה שגיאה 
export const handleProfileImgUpload  = (req,res,next) => {
    if(!req.file)
        return res.status(400).json({
            message: 'No file uploaded or file is not an image',
            error:'Image required'
        })
    
    const filePath = path.join(uploadsDir, req.file.filename);
    req.body.profilePicture = filePath;  
    next();
};

