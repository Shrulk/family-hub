import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes/api.routes.ts';
import { db, initDbPool } from './app/db.ts';
import { PORT } from './config/index.ts';

initDbPool()

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());

app.get('/is_ok', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api', apiRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// test db connection (TODO: remove at prod)
db.query('SELECT 1')
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database error', err));