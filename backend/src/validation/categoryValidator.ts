import Joi from 'joi';

export const categoryBodyValidateForCreate = Joi.object({
    name: Joi.string()
        .min(2)
        .max(255)
        .required()
        .messages({
            'string.empty': '"name" Can not be empty',
            'string.pattern.base': 'Enter only letter min 2 max 255',
        }),
});

export const categoryBodyValidateForUpdate = Joi.object({
    name: Joi.string()
        .min(2)
        .max(255)
        .messages({
            'string.empty': '"name" Can not be empty',
            'string.pattern.base': 'Enter only letter min 2 max 255',
        }),
    photo: Joi.any(),
});
