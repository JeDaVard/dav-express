import { Model } from 'sequelize';

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

interface WithAssociate {
    associate(models: { [key: string]: typeof Model }): void;
}

declare global {
    type ModelCtor<M extends Model> = typeof Model & WithAssociate & (new () => M);
}
