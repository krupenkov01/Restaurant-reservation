import Joi from "joi";


export const commentValidation = Joi.object({
    text: Joi.string().min(3).max(150).required(),
});
