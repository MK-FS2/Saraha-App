import multer, { diskStorage} from "multer";
import { nanoid } from "nanoid";
import fs from "node:fs";

export function FileUpload(SpecificFolder ,Types ,size) {
  const storage = diskStorage({
    destination: (req, file, cb) => 
    {
      const folderName = nanoid(12);
      const fullPath = `Uploads${folderName}/${SpecificFolder}`;
      if (!fs.existsSync(fullPath)) 
      {
        fs.mkdirSync(fullPath, { recursive: true });
      }
      cb(null, fullPath);
    },

    filename: (req, file, cb) => 
    {
      cb(null,`${nanoid(10)}-${file.originalname}`);
    },
  });

 const fileFilter = (req,file,cb)=>
 {
  if(!Types.includes(file.mimetype))
  {
    cb(new Error("Invalid format"))
  }
  else 
  {
    cb(null,true)
  }
 }

  return multer({fileFilter,  limits: { fileSize: size  },storage});
}