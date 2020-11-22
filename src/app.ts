import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { UserRouter } from './routes';

import { createTicketRouter } from './routes';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    }),
);
// app.use(currentUser)

app.use('/api', UserRouter);

app.get('/api/ping', (req, res) => {
    res.status(200).send('Pong');
});

app.use('*', async () => {
    // throw new NotFoundError()
});

// app.use(errorHandler)

export { app };
