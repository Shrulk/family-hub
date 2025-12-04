import express from 'express';
import { config } from 'dotenv';
import { apiRouter } from './routes/api.ts';
import { db, initDbPool } from './app/db.ts';

// init .env variables
config()

initDbPool()

const app = express();

app.use(express.json());

app.get('/is_ok', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api', apiRouter)

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// test db connection (TODO: remove at prod)
db.query('SELECT 1')
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database error', err));