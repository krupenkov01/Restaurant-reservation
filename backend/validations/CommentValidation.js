import Joi from "joi";


export const commentValidation = Joi.object({
  
    restaurantId: Joi.number().integer().required(),
    text: Joi.string().min(3).max(150).required(),
});
