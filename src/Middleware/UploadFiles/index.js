import multer, { diskStorage } from "multer";
import { nanoid } from "nanoid";
import fs from "node:fs";

export function FileUpload(SpecificFolder) {
  const storage = diskStorage({
    destination: (req, file, cb) => 
    {
      const folderName = nanoid(12);
      const fullPath = `Uploads/${folderName}/${SpecificFolder}`;
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

  return multer({ storage });
}