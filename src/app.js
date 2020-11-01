var express_1 = require('express');
require('express-async-errors');
var cookie_session_1 = require('cookie-session');
var routes_1 = require('./routes');
// import { createTicketRouter } from './routes'
var app = express_1["default"]();
app.set('trust proxy', true);
app.use(express_1["default"].json());
app.use(cookie_session_1["default"]({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));
// app.use(currentUser)
app.use('/api', routes_1.UserRouter);
app.get('/api/ping', function (req, res) {
    res.status(200).send('Pong');
});
app.use('*', async(), {});
exports["default"] = app;
