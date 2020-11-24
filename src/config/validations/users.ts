import Joi from 'joi';

export const usersInputSchema = {
    signIn: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    },
    signUp: {
        body: Joi.object({
            email: Joi.string().email(),
            password: Joi.string(),
        }),
    },
};
