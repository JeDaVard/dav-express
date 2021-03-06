import Joi from 'joi';

/* eslint-disable  @typescript-eslint/naming-convention */
const envSchema = {
    development: Joi.object({
        API_VERSION_URL: Joi.string().required(),
        API_VERSION_V2_URL: Joi.string().required(),
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        PORT: Joi.string().default(5000),
        NODE_LOGGING_LEVEL: Joi.string().default('debug'),
    })
        .unknown()
        .required(),
    test: Joi.object({
        API_VERSION_URL: Joi.string().required(),
        API_VERSION_V2_URL: Joi.string().required(),
        MONGO_URI: Joi.string().required(),
        MONGO_LINK: Joi.string(),
        MONGO_DB_NAME: Joi.string(),
        JWT_SECRET: Joi.string().required(),
        NODE_LOGGING_LEVEL: Joi.string().default('debug'),
    })
        .unknown()
        .required(),
    staging: Joi.object({
        API_VERSION_URL: Joi.string().required(),
        API_VERSION_V2_URL: Joi.string().required(),
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        PORT: Joi.string().required(),
        NODE_LOGGING_LEVEL: Joi.string().default('debug'),
    })
        .unknown()
        .required(),
    production: Joi.object({
        API_VERSION_URL: Joi.string().required(),
        API_VERSION_V2_URL: Joi.string().required(),
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        PORT: Joi.string().required(),
        NODE_LOGGING_LEVEL: Joi.string().default('debug'),
    })
        .unknown()
        .required(),
};
/* eslint-enable */

export { envSchema };
