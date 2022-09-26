import Joi from 'joi';

export const createProductValidator = Joi.object({
    imageUrl: Joi.string()
        .min(1)
        .max(1000000)
        .required()
        .messages({
            'string.empty': '"imageUrl" Can not be empty',
            'string.pattern.base': 'Max url size is 1000000 and Min url size is 1',
        }),

    name: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': '"name" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),

    count: Joi.number()
        .min(1)
        .max(1000000)
        .required()
        .messages({
            'string.empty': '"productPrice" Can not be empty',
            'string.pattern.base': 'Enter only letter min 1 max 1000000',
        }),
    width: Joi.number()
        .min(0)
        .max(1000000)
        .required()
        .messages({
            'string.empty': '"width" Can not be empty',
            'string.pattern.base': 'Enter only letter min 1 max 1000000',
        }),
    height: Joi.number()
        .min(1)
        .max(1000000)
        .required()
        .messages({
            'string.empty': '"width" Can not be empty',
            'string.pattern.base': 'Enter only letter min 1 max 1000000',
        }),
    weight: Joi.number()
        .min(1)
        .max(1000000)
        .required()
        .messages({
            'string.empty': '"weight" Can not be empty',
            'string.pattern.base': 'Enter only letter min 1 max 1000000',
        }),

});
