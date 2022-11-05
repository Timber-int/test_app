import Joi from 'joi';
import { CONSTANTS } from '../constants';

export const createNameValidator = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .regex(CONSTANTS.NAME_REGEX)
        .messages({
            'string.empty': '"name" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 30',
        }),
});

export const updateNameRankValidator = Joi.object({
    id: Joi.number()
        .min(1)
        .max(1000000)
        .required()
        .messages({
            'number.base': 'Id must be number',
            'number.min': 'Number min 1',
            'number.max': 'Number max 1000000',
        }),
});
