"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Or you can do this way
// export interface ExtendedRequest extends Request {
//     [key: string]: any
// }
exports.currentUser = function (req, res, next) {
    var _a;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt))
        return next();
    try {
        req.user = jsonwebtoken_1.default.verify(req.session.jwt, process.env.JWT_SECRET);
    }
    catch (e) { }
    next();
};