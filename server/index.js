import jsonServer from 'json-server';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, './db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/uploads/');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    console.log('Saving file with name:', uniqueName);
    cb(null, uniqueName);
  },
});

server.use('/api', router);
server.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

const upload = multer({ storage });

server.post('/upload', upload.single('filedata'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imgUrl = `/uploads/${req.file.filename}`;
  const userId = req.body.userId;

  console.log('Image URL:', imgUrl);

  const dbFilePath = path.join(__dirname, '../db.json');
  let dbData;

  try {
    dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
  } catch (error) {
    console.error('Error reading db.json:', error);
    return res.status(500).json({ message: 'Error reading database file' });
  }

  const user = dbData.users.find((u) => u.id === userId);
  if (user) {
    user.imgUrl = imgUrl;

    try {
      fs.writeFileSync(dbFilePath, JSON.stringify(dbData, null, 2));
    } catch (error) {
      console.error('Error writing to db.json:', error);
      return res.status(500).json({ message: 'Error saving database file' });
    }

    res.status(200).json({ message: 'Image uploaded and URL saved', imgUrl });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
