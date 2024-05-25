const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const app = express();
const PORT = process.env.REACT_APP_PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/generate-image', async (req, res) => {
  const { description } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/images/generations', {
      prompt: description,
      n: 1,
      size: "1024x1024"
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_OPEN_API}`,
        'Content-Type': 'application/json'
      }
    });

    const imageUrl = response.data.data[0].url;
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    const imageBuffer = Buffer.from(imageResponse.data, 'binary');
    const imagePath = path.join(__dirname, 'images', 'generated_image.png');

    fs.writeFileSync(imagePath, imageBuffer);
    res.send(imageBuffer);
  } catch (error) {
    res.status(500).send('Error generating image');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
