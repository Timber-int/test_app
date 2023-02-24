import Joi from 'joi';

export const createProductSizeValidator = Joi.object({
    productSize: Joi.number()
        .min(0)
        .max(60)
        .required()
        .messages({
            'string.empty': '"productSize" Can not be empty',
            'string.pattern.base': 'Enter only letter min 0 max 60',
        }),
    productId: Joi.number()
        .required(),
});
