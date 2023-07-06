import { Users } from "src/helpers";
import { signupValidation } from "./auth.validation";
import { AUTH_MESSAGE_CONSTANT } from "src/common/constants";
import { IUser, IAuthSignupPayload } from "src/common/interfaces";
import { BadRequestError, ConflictRequestError, sanitizeFields } from "src/common/utils";

class AuthService {
  async signup(reqBody: IAuthSignupPayload & { confirmPassword?: string }): Promise<IUser> {
    const { error, value } = signupValidation(reqBody);
    if (error) throw new BadRequestError(error.details[0].message);

    if (value.password !== value.confirmPassword) throw new BadRequestError(AUTH_MESSAGE_CONSTANT.PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCHED);

    let userExits = await this.findUserByUnique({ email: value.email });
    if (userExits) throw new ConflictRequestError(AUTH_MESSAGE_CONSTANT.EMAIL_ALREADY_TAKEN);

    userExits = await this.findUserByUnique({ phone: value.phone });
    if (userExits) throw new ConflictRequestError(AUTH_MESSAGE_CONSTANT.PHONE_ALREADY_TAKEN);

    userExits = await this.findUserByUnique({ username: value.username });
    if (userExits) throw new ConflictRequestError(AUTH_MESSAGE_CONSTANT.USERNAME_ALREADY_TAKEN);

    const sanitizeUser = sanitizeFields(value, ["confirmPassword"]);
    const user = await Users.create({ data: sanitizeUser });
    if (!user) throw new BadRequestError(AUTH_MESSAGE_CONSTANT.UNABLE_TO_CREATE_USER);

    return user;
  }

  private async findUserByUnique(query: { [key: string]: string }): Promise<IUser | null> {
    return Users.findUnique({ where: query });
  }
}

const authService = new AuthService();
export default authService;
