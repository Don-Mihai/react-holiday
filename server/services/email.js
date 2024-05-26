import nodemailer from 'nodemailer';

const FROM_MAIL = 'mihai807@mail.ru';

export const sendEmail = (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru', // Замените на адрес SMTP-сервера вашего почтового провайдера
    port: 465, // Замените на порт вашего SMTP-сервера
    secure: true, // Установите true, если ваш SMTP-сервер требует SSL
    auth: {
      user: FROM_MAIL, // Замените на имя пользователя вашего почтового провайдера
      pass: '', // Замените на пароль вашего почтового провайдера
    },
  });

  // Настройка опций письма
  const mailOptions = {
    from: FROM_MAIL,
    to,
    subject,
    html,
  };

  // Отправка письма
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Письмо успешно отправлено: ' + to);
    }
  });
};
