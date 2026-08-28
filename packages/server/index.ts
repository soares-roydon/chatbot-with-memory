import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cors from 'cors';
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
   return res.send('Server is healthy');
});

app.use('/api', router);

export default app;

// app.listen(port, () => {
//    console.log(`Server running on http://localhost:${port}`);
// });
