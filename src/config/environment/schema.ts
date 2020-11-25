import Joi from 'joi';

/* eslint-disable  @typescript-eslint/naming-convention */
const envSchema = {
    development: Joi.object({
        apiVersionUrl: Joi.string().required(),
        mongoUri: Joi.string().required(),
        jwtSecret: Joi.string().required(),
        PORT: Joi.string().default(5000),
    })
        .unknown()
        .required(),
    test: Joi.object({
        apiVersionUrl: Joi.string().required(),
        mongoUri: Joi.string().required(),
        jwtSecret: Joi.string().required(),
    })
        .unknown()
        .required(),
    staging: Joi.object({
        apiVersionUrl: Joi.string().required(),
        mongoUri: Joi.string().required(),
        jwtSecret: Joi.string().required(),
        PORT: Joi.string().required(),
    })
        .unknown()
        .required(),
    production: Joi.object({
        apiVersionUrl: Joi.string().required(),
        mongoUri: Joi.string().required(),
        jwtSecret: Joi.string().required(),
        PORT: Joi.string().required(),
    })
        .unknown()
        .required(),
};
/* eslint-enable */

export { envSchema };
