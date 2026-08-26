import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`);
});
