export {};

declare module 'express-session' {
    interface SessionData {
        jwt?: any;
    }
}

declare global {
    namespace Express {
        interface Request {
            // [key: string]: any
            user?: any;
        }
    }
}
