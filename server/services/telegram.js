import fetch from 'node-fetch';

// Замените 'YOUR_BOT_TOKEN' на ваш токен бота
const BOT_TOKEN = '';

// Замените 'YOUR_CHAT_ID' на ID чата, в который вы хотите отправить сообщение
const CHAT_ID = '-4062213396';

// Функция для отправки сообщения
export async function sendMessage(message) {
  const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const params = {
    chat_id: CHAT_ID,
    text: message,
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
  }
}
