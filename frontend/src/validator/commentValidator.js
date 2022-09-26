import Joi from 'joi';

export const createCommentValidator = Joi.object({
    description: Joi.string()
        .min(1)
        .max(1000000)
        .required()
        .messages({
            'string.empty': '"description" Can not be empty',
            'string.pattern.base': 'Max description size is 1000000 and Min description size is 1',
        }),
});
