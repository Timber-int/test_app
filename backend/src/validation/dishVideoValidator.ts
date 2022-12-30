import Joi from 'joi';

export const dishVideoValidateForCreate = Joi.object({
    dishId: Joi.number()
        .required(),

});
