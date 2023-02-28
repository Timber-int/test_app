import Joi from 'joi';

export const createGenderCategoryValidator = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': '"title" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 100',
        }),
    genderId: Joi.number()
        .required(),
});

export const updateGenderCategoryValidator = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .messages({
            'string.empty': '"title" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 100',
        }),
});
