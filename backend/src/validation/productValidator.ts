import Joi from 'joi';

export const createProductValidator = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': '"title" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 100',
        }),
    price: Joi.number()
        .min(0)
        .max(1000000)
        .required()
        .messages({
            'string.empty': '"price" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 1000000',
        }),
    count: Joi.number()
        .min(0)
        .max(1000000)
        .required()
        .messages({
            'string.empty': '"count" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 1000000',
        }),
    hasDiscount: Joi.boolean()
        .default(false),

    discount: Joi.number()
        .min(0)
        .max(100)
        .messages({
            'string.empty': '"discount" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 1000000',
        }),
    priceBeforeDiscount: Joi.number()
        .min(0)
        .max(1000000)
        .required()
        .messages({
            'string.empty': '"priceBeforeDiscount" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 1000000',
        }),
    categoryId: Joi.number()
        .required(),
});

export const updateProductSetDiscountValidator = Joi.object({
    discount: Joi.number()
        .min(0)
        .max(100)
        .required()
        .messages({
            'string.empty': '"discount" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 1000000',
        }),
});

export const updateProductValidator = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': '"title" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 100',
        }),
    photo: Joi.string(),
    price: Joi.number()
        .min(0)
        .max(1000000)
        .messages({
            'string.empty': '"price" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 1000000',
        }),
    count: Joi.number()
        .min(0)
        .max(1000000)
        .messages({
            'string.empty': '"count" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 1000000',
        }),
});
