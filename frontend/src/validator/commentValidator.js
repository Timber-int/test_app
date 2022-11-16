import Joi from 'joi';

export const commentBodyValidateForCreate = Joi.object({
    text: Joi.string()
        .min(1)
        .max(1000000)
        .required()
        .messages({
            'string.empty': '"text" Can not be empty',
            'string.pattern.base': 'Enter only letter min 1 max 1000000',
        }),
});
