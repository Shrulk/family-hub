import express from 'express';
import { apiRouter } from './routes/api.ts';

const app = express();

app.use(express.json());

app.get('/is_ok', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api', apiRouter)

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
