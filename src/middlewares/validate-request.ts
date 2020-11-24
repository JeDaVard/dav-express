import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

import { RequestValidationError } from 'libs/errors';

interface ValidationSchema {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
}

enum fieldSourceKey {
    body = 'body',
    params = 'params',
    query = 'query',
}

const options = {
    abortEarly: false,
    errors: {
        escapeHtml: true,
        wrap: {
            label: false,
        },
    },
};

export const validateRequest = (inputs: ValidationSchema) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const results = validateReqBySchema(req, inputs);

    if (results.length > 0) throw new RequestValidationError(results);

    next();
};

const validateReqBySchema = (req: Request, schemas: ValidationSchema) => {
    const validated = Object.entries(schemas).map(([key, schema]) => {
        const sourceType = key as fieldSourceKey;
        return {
            errors: schema.validate(req[sourceType], options).error,
            sourceType,
        };
    });
    return validated.filter((errObj) => !!errObj.errors);
};
