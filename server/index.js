import jsonServer from 'json-server';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import express from 'express';

// Получение текущего пути файла
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../db.json'));
const middlewares = jsonServer.defaults();

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Загрузка изображения и сохранение ссылки в db.json
server.post('/upload', upload.single('image'), (req, res) => {
  const imgUrl = `/uploads/${req.file.filename}`;
  const userId = req.body.userId;

  // Чтение db.json
  const dbFilePath = path.join(__dirname, '../db.json');
  const dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

  // Поиск пользователя по ID и обновление поля imgUrl
  const user = dbData.users.find((u) => u.id === userId);
  if (user) {
    user.imgUrl = imgUrl;

    // Сохранение обновленного db.json
    fs.writeFileSync(dbFilePath, JSON.stringify(dbData, null, 2));

    res.status(200).json({ message: 'Image uploaded and URL saved', imgUrl });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use('/api', router);

// Статическая отдача загруженных файлов
server.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
