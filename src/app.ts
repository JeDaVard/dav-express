import express from 'express';
import 'express-async-errors';
import session from 'cookie-session';

import { NotFoundError } from 'libs/errors';
import { currentUser, errorHandler } from 'middlewares';
import { UserRouter } from 'routes';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
    session({
        signed: false,
        secure: process.env.NODE_ENV === 'production',
    }),
);

app.use(currentUser);

app.use('/api/users', UserRouter);

app.get('/api/ping', (req, res) => {
    res.status(200).send('Pong');
});

app.use('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
