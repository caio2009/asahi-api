import AppError from '@shared/errors/AppError';
import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const uploadsFolder = path.resolve(__dirname, '..', '..', 'uploads');

// interface IUploadConfig {
//   uploadsFolder: string;

//   multer: {
//     storage: StorageEngine
//   };
// }

export default {
  uploadsFolder,

  multer: {
    storage: multer.diskStorage({
      destination: uploadsFolder,
      filename: (req, file, cb) => {
        const hash = crypto.randomBytes(10).toString('hex');
        const filename = `${hash}-${file.originalname}`;

        return cb(null, filename);
      }
    }),
    limits: {
      fileSize: 10 * 1024 * 1024
    },
    fileFilter: (req: any, file: any, cb: any) => {
      const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/jpg'];

      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new AppError(400, 'Invalid file type'));
      }
    }
  }
};