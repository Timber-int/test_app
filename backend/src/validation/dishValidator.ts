import Joi from 'joi';

export const dishBodyValidateForCreate = Joi.object({
    name: Joi.string()
        .min(2)
        .max(255)
        .required()
        .messages({
            'string.empty': '"name" Can not be empty',
            'string.pattern.base': 'Enter only letter min 2 max 255',
        }),
    recipe: Joi.string()
        .min(2)
        .max(1000000)
        .required()
        .messages({
            'string.empty': '"recipe" Can not be empty',
            'string.pattern.base': 'Enter only letter min 2 max 1000000',
        }),
    categoryId: Joi.number()
        .required(),

    calories: Joi.number()
        .required(),
});

export const dishBodyValidateForUpdate = Joi.object({
    name: Joi.string()
        .min(2)
        .max(255)
        .messages({
            'string.empty': '"name" Can not be empty',
            'string.pattern.base': 'Enter only letter min 2 max 255',
        }),
    recipe: Joi.string()
        .min(2)
        .max(1000000)
        .messages({
            'string.empty': '"recipe" Can not be empty',
            'string.pattern.base': 'Enter only letter min 2 max 1000000',
        }),
    calories: Joi.number(),
    photo: Joi.any(),
});

// export const dishCategoryIdValidate = Joi.object({
//     categoryId: Joi.number()
//         .min(1)
//         .required(),
// });
