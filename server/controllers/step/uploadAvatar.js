import expressAsyncHandler from 'express-async-handler';
import { saveData } from '../../utils/index.js';

const uploadIcon = expressAsyncHandler((req, res) => {
  let filedata = req.file;
  let stepId = req.body.id;

  if (!filedata) {
    res.send('Ошибка при загрузке файла');
  } else {
    // Сохраняем путь до изображения в файле db.json
    console.log('stepId', stepId);
    saveData(stepId, 'imgUrl', filedata.filename, 'steps');
    res.send(filedata.filename);
  }

  res.send('');
});

export default uploadIcon;
