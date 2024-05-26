import fs from 'fs';

function updateObjectByKey(obj, propertyKey, propertyValue) {
  for (let key in obj) {
    if (key === propertyKey) {
      obj[key] = propertyValue;
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      updateObjectByKey(obj[key], propertyKey, propertyValue);
    }
  }
}

export function saveData(id, propertyKey, propertyValue, path = 'users') {
  const dbFilePath = 'server/db.json';
  let fileData = {};

  try {
    // Пытаемся прочитать существующие данные из файла
    const existingData = fs.readFileSync(dbFilePath, 'utf8');
    fileData = JSON.parse(existingData);
  } catch (error) {
    // Если файл не существует или возникла ошибка при чтении, создаем пустой объект
    fileData = {};
  }

  // Обновляем данные в объекте
  if (fileData[path]) {
    fileData[path] = fileData[path].map((item) => {
      if (String(item.id) === String(id)) {
        updateObjectByKey(item, propertyKey, propertyValue);
      }
      return item;
    });
  }

  // Записываем обновленные данные обратно в файл
  fs.writeFileSync(dbFilePath, JSON.stringify(fileData, null, 2), 'utf8');
}
