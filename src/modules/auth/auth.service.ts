import { Users, generateHashPassword } from "src/helpers";
import { signupValidation } from "./auth.validation";
import { AUTH_MESSAGE_CONSTANT } from "src/common/constants";
import { IAuthSignup, IAuthSignupPayload, IUser } from "src/common/interfaces";
import { BadRequestError, ConflictRequestError, sanitizeFields } from "src/common/utils";

const signup = async (reqBody: IAuthSignupPayload): Promise<IAuthSignup> => {
  const { error, value } = signupValidation(reqBody);
  if (error) throw new BadRequestError(error.details[0].message);

  if (value.password !== value.confirmPassword) throw new BadRequestError(AUTH_MESSAGE_CONSTANT.PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCHED);
  let userExits = await findUserByUnique({ email: value.email });
  if (userExits) throw new ConflictRequestError(AUTH_MESSAGE_CONSTANT.EMAIL_ALREADY_TAKEN);

  const sanitizeUser = sanitizeFields<IAuthSignupPayload>(value, ["confirmPassword"]);
  const hashPassword = await generateHashPassword(sanitizeUser.password);

  const user = await Users.create({
    data: { ...sanitizeUser, password: hashPassword },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      username: true,
      phone: true,
      avatar: true,
      createdAt: true,
      updatedAt: true
    }
  });
  if (!user) throw new BadRequestError(AUTH_MESSAGE_CONSTANT.UNABLE_TO_CREATE_USER);

  return user;
};

const findUserByUnique = (query: { [key: string]: string }): Promise<IUser | null> => {
  return Users.findUnique({ where: query });
};

export default {
  signup
};
