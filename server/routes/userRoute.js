import express from 'express';
import uploadAvatar from '../controllers/user/uploadAvatar.js';
import multer from 'multer';

const router = express.Router();

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

router.route('/upload-avatar').post(multer({ storage: storageConfig }).single('filedata'), uploadAvatar);
router.route('/reg').post(multer({ storage: storageConfig }).single('filedata'), uploadAvatar);
router.route('/auth').post(multer({ storage: storageConfig }).single('filedata'), uploadAvatar);

export default router;
