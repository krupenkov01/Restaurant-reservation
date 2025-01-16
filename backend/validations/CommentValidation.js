import Joi from "joi";


export const commentValidation = Joi.object({
    text: Joi.string().alphanum().min(3).max(150).required(),
})

