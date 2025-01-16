import Joi from "joi";
import passport from "passport";

export const userValidation = Joi.object({
    id: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    regpass: Joi.string().min(5).required(),
})

