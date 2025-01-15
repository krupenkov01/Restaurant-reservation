import Joi from "joi";
import passport from "passport";

export const userValidation = Joi.object({
    email: Joi.string().email().required(),
    regpass: Joi.string().min(5).required(),
})

