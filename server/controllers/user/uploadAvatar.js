import expressAsyncHandler from 'express-async-handler';
import { saveData } from '../../utils/index.js';

const uploadAvatar = expressAsyncHandler((req, res) => {
  let filedata = req.file;
  let userId = req.body?.id;

  console.log('userId', userId);

  if (!filedata) {
    res.send('Ошибка при загрузке файла');
  } else {
    // Сохраняем путь до изображения в файле db.json
    console.log('userId', userId);
    saveData(userId, 'imgUrl', filedata.filename);
    res.send(filedata.filename);
  }

  res.send('');
});

export default uploadAvatar;
