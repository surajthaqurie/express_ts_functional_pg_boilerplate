import { AUTH_MESSAGE_CONSTANT } from "src/common/constants";
import { IAuthSignup } from "src/common/interfaces";
import { Users } from "src/helpers";
import { AppError } from "src/utils";

class AuthService {
  async signup(value: IAuthSignup): Promise<any> {
    let query: { [key: string]: string } = { email: value.email };
    let userExits = await this.findUserByUnique(query);
    if (userExits) {
      throw new AppError(AUTH_MESSAGE_CONSTANT.EMAIL_ALREADY_TAKEN, 409);
    }

    query = { phone: value.phone };
    userExits = await this.findUserByUnique(query);
    if (userExits) {
      throw new AppError(AUTH_MESSAGE_CONSTANT.PHONE_ALREADY_TAKEN, 409);
    }

    query = { username: value.username };
    userExits = await this.findUserByUnique(query);
    if (userExits) {
      throw new AppError(AUTH_MESSAGE_CONSTANT.USERNAME_ALREADY_TAKEN, 409);
    }
    const user = Users.create({ data: value });

    return user;
  }
  private async findUserByUnique(query: { [key: string]: string }): Promise<any> {
    await Users.findUnique({ where: query });
  }
}

const authService = new AuthService();
export default authService;
