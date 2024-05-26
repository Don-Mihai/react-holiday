import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoute.js';
import stepRoutes from './routes/stepRoute.js';
import env from 'dotenv';

env.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./uploads'));

app.use('/user', userRoutes);
app.use('/step', stepRoutes);

const PORT = process.env.REACT_APP_PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
