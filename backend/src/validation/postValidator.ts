import Joi from 'joi';

export const postBodyValidateForCreate = Joi.object({
    title: Joi.string()
        .min(2)
        .max(255)
        .required()
        .messages({
            'string.empty': '"title" Can not be empty',
            'string.pattern.base': 'Enter only letter min 1 max 255',
        }),
    text: Joi.string()
        .min(1)
        .max(1000000)
        .required()
        .messages({
            'string.empty': '"text" Can not be empty',
            'string.pattern.base': 'Enter only letter min 1 max 1000000',
        }),
    userId: Joi.number()
        .required(),
});

export const postVideoValidateForCreate = Joi.object({
    userId: Joi.number()
        .required(),
    postId: Joi.number()
        .required(),
});

export const postBodyValidateForUpdate = Joi.object({
    title: Joi.string()
        .min(2)
        .max(255)
        .messages({
            'string.empty': '"title" Can not be empty',
            'string.pattern.base': 'Enter only letter min 1 max 255',
        }),
    text: Joi.string()
        .min(1)
        .max(1000000)
        .messages({
            'string.empty': '"text" Can not be empty',
            'string.pattern.base': 'Enter only letter min 1 max 1000000',
        }),
    photo: Joi.any(),
    userId: Joi.number()
        .required(),
});
