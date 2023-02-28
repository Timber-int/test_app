import Joi from 'joi';

export const createProductPhotoValidator = Joi.object({
    productId: Joi.number()
        .required(),
});
