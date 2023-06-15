import Joi from "joi";
import { IAuthSignup } from "src/common/interfaces";

export const signupValidation = (data: IAuthSignup): Joi.ValidationResult<IAuthSignup> => {
  const schema = Joi.object<IAuthSignup, true>({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    username: Joi.string().trim().required(),
    phone: Joi.string().trim().required(),
    email: Joi.string().lowercase().email().trim().required(),
    password: Joi.string()
      // .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .trim()
      .required(),
    confirmPassword: Joi.string().trim().required().optional()
  });

  return schema.validate(data);
};
