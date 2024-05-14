import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FILE_TYPES } from '../constants/image-types';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPES[file.mimetype];
    let uploadError: Error | null = new Error('El tipo de imagen no es válido');
    if (isValid) uploadError = null;
    cb(uploadError, path.join(__dirname, '../../public/images')); // Directorio donde se guardarán las imágenes
    console.log(__dirname, '../../public/images');
    console.log({ __dirname })
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPES[file.mimetype];
    cb(null, `${fileName}-${uuidv4()}.${extension}`);
  }
});

const upload = multer({ storage: storage });
export default upload;
