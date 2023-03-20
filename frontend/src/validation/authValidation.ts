import Joi from 'joi';
import {CONSTANTS} from '../constants';

export const registrationDataValidator = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .required()
        .regex(CONSTANTS.NAME_REGEX)
        .messages({
            'string.empty': '"firstName" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 30',
        }),
    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .required()
        .regex(CONSTANTS.NAME_REGEX)
        .messages({
            'string.empty': '"lastName" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 30',
        }),
    email: Joi.string()
        .regex(CONSTANTS.EMAIL_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Email not valid',
        }),
    password: Joi.string()
        .regex(CONSTANTS.PASSWORD_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Password not valid',
        }),

});

export const loginDataValidator = Joi.object({
    email: Joi.string()
        .regex(CONSTANTS.EMAIL_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Email not valid',
        }),
    password: Joi.string()
        .regex(CONSTANTS.PASSWORD_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Password not valid',
        }),
});
export const forgotPasswordDataValidator = Joi.object({
    email: Joi.string()
        .regex(CONSTANTS.EMAIL_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Email not valid',
        }),

});
export const forgotPasswordSetDataValidator = Joi.object({
    password: Joi.string()
        .regex(CONSTANTS.PASSWORD_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Password not valid',
        }),
    confirmPassword: Joi.string()
        .regex(CONSTANTS.PASSWORD_REGEXP)
        .required()
        .trim()
        .equal(Joi.ref('password'))
        .messages({
            'string.pattern.base': 'Confirm password not valid',
        }),

});
