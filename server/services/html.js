export const getHtmlText = (userName, link) => {
  return `
        <div style="position: relative; padding: 90px 0; text-align: center; white-space: normal; background: #4399ff; font-family: 'Arial';">
    <div style="display: inline-block; width: 600px; padding: 40px 0; text-align: left; background: #ffffff">
        <div style="text-align: center; padding: 0 50px">
            <p style="margin: 40px 0 0 0; font-weight: 700; font-size: 28px; line-height: 150%">Уважаемый ${userName}</p>
            <p style="margin: 40px 0 0 0; font-weight: 400; font-size: 16px; line-height: 150%">
            </p>

            <a
                    style="
                            display: block;
                            margin: 20px 0 0 0;
                            font-weight: 600;
                            font-size: 16px;
                            padding: 17px;
                            text-decoration: none;
                            background: #4399ff;
                            color: #fff;
                        "
            >
                Ссылка для активации ${link}
            </a>

            <p style="margin: 40px 0 0 0; color: #95a2b3; font-weight: 400; font-size: 16px">
                Если вы не cоздавали эту учетную запись, можете проигнорировать это сообщение
            </p>
            <p style="margin: 56px 0 0 0; font-weight: 400; font-size: 16px; color: #323232">
                С наилучшими пожеланиями,<br />
                Команда <a style="color: #4399ff" href="https://inordic.ru/">nordic</a>
            </p>
        </div>
    </div>
    <p style="margin: 40px 0 0 0; font-weight: 400; font-size: 16px; line-height: 150%; color: #fff">
        inordic
    </p>
</div>
        
        `;
};
