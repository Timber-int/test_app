import Joi from 'joi';

export const createProductInformationValidator = Joi.object({
    collection: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': '"collection" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    season: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': '"season" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    typeOfShoes: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': '"typeOfShoes" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    color: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': '"color" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    colorRange: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': '"colorRange" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    topMaterial: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': '"topMaterial" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    inside: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': '"inside" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    typeOfHeels: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': '"typeOfHeels" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    heels: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': '"heels" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    production: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': '"production" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    additional: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': '"additional" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    colorOrShade: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': '"colorOrShade" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    productId: Joi.number()
        .required(),
});

export const updateProductInformationValidator = Joi.object({
    collection: Joi.string()
        .min(3)
        .max(255)
        .messages({
            'string.empty': '"collection" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    season: Joi.string()
        .min(3)
        .max(255)
        .messages({
            'string.empty': '"season" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    typeOfShoes: Joi.string()
        .min(3)
        .max(255)
        .messages({
            'string.empty': '"typeOfShoes" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    color: Joi.string()
        .min(3)
        .max(255)
        .messages({
            'string.empty': '"color" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    colorRange: Joi.string()
        .min(3)
        .max(255)
        .messages({
            'string.empty': '"colorRange" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    topMaterial: Joi.string()
        .min(3)
        .max(255)
        .messages({
            'string.empty': '"topMaterial" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    inside: Joi.string()
        .min(3)
        .max(255)
        .messages({
            'string.empty': '"inside" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    typeOfHeels: Joi.string()
        .min(3)
        .max(255)
        .messages({
            'string.empty': '"typeOfHeels" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    heels: Joi.string()
        .min(3)
        .max(255)
        .messages({
            'string.empty': '"heels" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    production: Joi.string()
        .min(3)
        .max(255)
        .messages({
            'string.empty': '"production" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    additional: Joi.string()
        .min(3)
        .max(255)
        .messages({
            'string.empty': '"additional" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
    colorOrShade: Joi.string()
        .min(3)
        .max(255)
        .messages({
            'string.empty': '"colorOrShade" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 255',
        }),
});
