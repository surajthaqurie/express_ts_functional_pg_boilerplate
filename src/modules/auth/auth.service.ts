import { AUTH_MESSAGE_CONSTANT } from "src/common/constants";
import { IUser, IAuthSignupPayload } from "src/common/interfaces";
import { BadRequestError, ConflictRequestError } from "src/common/utils";
import { Users } from "src/helpers";
import { signupValidation } from "./auth.validation";

class AuthService {
  async signup(reqBody: IAuthSignupPayload & { confirmPassword?: string }): Promise<IUser> {
    const { error, value } = signupValidation(reqBody);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    let query: { [key: string]: string } = { email: value.email };
    let userExits = await this.findUserByUnique(query);
    if (userExits) {
      throw new ConflictRequestError(AUTH_MESSAGE_CONSTANT.EMAIL_ALREADY_TAKEN);
    }

    query = { phone: value.phone };
    userExits = await this.findUserByUnique(query);
    if (userExits) {
      throw new ConflictRequestError(AUTH_MESSAGE_CONSTANT.PHONE_ALREADY_TAKEN);
    }

    query = { username: value.username };
    userExits = await this.findUserByUnique(query);
    if (userExits) {
      throw new ConflictRequestError(AUTH_MESSAGE_CONSTANT.USERNAME_ALREADY_TAKEN);
    }

    delete value.confirmPassword;
    const user = await Users.create({ data: value });
    return user;
  }

  private async findUserByUnique(query: { [key: string]: string }): Promise<IUser | null> {
    return await Users.findUnique({ where: query });
  }
}

const authService = new AuthService();
export default authService;
