import { Users } from "src/helpers";
import { signupValidation } from "./auth.validation";
import { AUTH_MESSAGE_CONSTANT } from "src/common/constants";
import { IAuthSignupPayload, IUser } from "src/common/interfaces";
import { BadRequestError, sanitizeFields } from "src/common/utils";

const signup = async (reqBody: IAuthSignupPayload & { confirmPassword?: string }): Promise<IUser> => {
  const { error, value } = signupValidation(reqBody);
  if (error) throw new BadRequestError(error.details[0].message);

  if (value.password !== value.confirmPassword) throw new BadRequestError(AUTH_MESSAGE_CONSTANT.PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCHED);

  const sanitizeUser = sanitizeFields<IAuthSignupPayload & { confirmPassword?: string }>(value, ["confirmPassword"]);

  const user = await Users.create({ data: sanitizeUser });
  if (!user) throw new BadRequestError(AUTH_MESSAGE_CONSTANT.UNABLE_TO_CREATE_USER);

  return user;
};

export default {
  signup
};
