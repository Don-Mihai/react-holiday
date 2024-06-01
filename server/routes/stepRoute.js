import express from 'express';
import multer from 'multer';
import uploadIcon from '../controllers/step/uploadAvatar.js';
import generateIcon from '../controllers/step/generateIcon.js';

const router = express.Router();

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

router.route('/upload-icon').post(multer({ storage: storageConfig }).single('filedata'), uploadIcon);
router.route('/generate-icon').post(generateIcon);

export default router;
