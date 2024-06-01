import expressAsyncHandler from 'express-async-handler';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import env from 'dotenv';

env.config();

const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPEN_API });

const generateIcon = expressAsyncHandler(async (req, res) => {
  let stepId = req.body.id;
  let description = req.body.description;

  try {
    // Запрос на генерацию изображения
    const response = await openai.createImage({
      prompt: description,
      n: 1,
      size: '256x256',
    });

    // Получаем URL изображения
    const imageUrl = response.data.data[0].url;

    // Загружаем изображение
    const imageBuffer = await fetch(imageUrl).then((res) => res.buffer());

    // Обрабатываем изображение с помощью sharp (например, изменяем размер)
    const processedImage = await sharp(imageBuffer).resize(256, 256).toBuffer();

    // Сохраняем изображение в файл
    const outputPath = path.join(__dirname, 'output.png');
    fs.writeFileSync(outputPath, processedImage);

    console.log(`Иконка успешно сгенерирована и сохранена в ${outputPath}`);
  } catch (error) {
    console.error('Ошибка при генерации иконки:', error);
  }

  res.send('');
});

export default generateIcon;
