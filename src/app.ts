import express from 'express';
import 'express-async-errors';
import session from 'cookie-session';
import router from 'routes';
import { headers } from 'utils/headers';
// import expressWinston from 'express-winston';
// import winston from 'winston';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(headers);
app.use(express.json());
app.use(
    session({
        signed: false,
        secure: process.env.NODE_ENV === 'production',
    }),
);

// app.use(
//     expressWinston.logger({
//         transports: [new winston.transports.Console()],
//         format: winston.format.combine(winston.format.colorize(), winston.format.json()),
//         meta: true, // optional: control whether you want to log the meta data about the request (default to true)
//         msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
//         expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
//         colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
//         ignoreRoute: function (req, res) {
//             return false;
//         }, // optional: allows to skip some log messages based on request and/or response
//     }),
// );

// Inject apis
app.use(router);

export { app };
